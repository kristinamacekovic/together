/// <reference path="../types.d.ts" />
// @ts-ignore - Deno HTTP URL imports work at runtime
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
// @ts-ignore - ESM.sh imports work at runtime in Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Use service role to access all users' data
    )

    // Get total actual duration across all sessions and users
    const { data: sessionsData, error: sessionsError } = await supabaseClient
      .from('sessions')
      .select('actual_duration, planned_duration, status')

    if (sessionsError) {
      throw new Error(`Failed to fetch sessions: ${sessionsError.message}`)
    }

    // Calculate total minutes used
    let totalMinutesUsed = 0
    let totalSessions = 0
    let completedSessions = 0

    sessionsData?.forEach(session => {
      totalSessions++
      if (session.status === 'completed' && session.actual_duration) {
        totalMinutesUsed += session.actual_duration
        completedSessions++
      }
    })

    // Calculate usage statistics
    const LIMIT_MINUTES = 126
    const usagePercentage = Math.round((totalMinutesUsed / LIMIT_MINUTES) * 100)
    const remainingMinutes = Math.max(0, LIMIT_MINUTES - totalMinutesUsed)
    const isOverLimit = totalMinutesUsed > LIMIT_MINUTES

    const response = {
      totalMinutesUsed,
      limitMinutes: LIMIT_MINUTES,
      remainingMinutes,
      usagePercentage,
      isOverLimit,
      totalSessions,
      completedSessions,
      lastUpdated: new Date().toISOString()
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Get total usage error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}) 