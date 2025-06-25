import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const END_CONVERSATION_FUNCTION_URL = 'https://jsiavohlypmyifvuxnen.functions.supabase.co/end-conversation';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const event = await req.json()
    console.log('Received Tavus webhook event:', JSON.stringify(event, null, 2))

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Use service role for webhook
    )

    // Handle different event types
    if (event.event_type === 'conversation.started' && event.conversation_id) {
      console.log('Updating session start for conversation:', event.conversation_id)
      // Update session when conversation starts
      const { error: startError } = await supabaseClient
        .from('sessions')
        .update({ 
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('conversation_id', event.conversation_id)
      
      if (startError) {
        console.error('Error updating session start:', startError)
      } else {
        console.log('Successfully updated session start')
      }
    }

    if (event.event_type === 'system.shutdown' && event.conversation_id) {
      console.log('Processing conversation end for:', event.conversation_id)
      
      // Calculate actual duration and update session when conversation ends
      const { data: session, error: fetchError } = await supabaseClient
        .from('sessions')
        .select('started_at, created_at')
        .eq('conversation_id', event.conversation_id)
        .single()

      if (fetchError) {
        console.error('Error fetching session:', fetchError)
      } else {
        console.log('Found session:', session)
      }

      let actualDuration: number | null = null
      if (session?.started_at) {
        const startTime = new Date(session.started_at)
        const endTime = new Date()
        actualDuration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)) // minutes
        console.log('Calculated duration:', actualDuration, 'minutes')
      }

      // Update session with end data
      const { error: updateError } = await supabaseClient
        .from('sessions')
        .update({ 
          status: 'completed',
          ended_at: new Date().toISOString(),
          actual_duration: actualDuration
        })
        .eq('conversation_id', event.conversation_id)
      
      if (updateError) {
        console.error('Error updating session end:', updateError)
      } else {
        console.log('Successfully updated session end with duration:', actualDuration)
      }

      // Still call the end-conversation function
      const endRes = await fetch(END_CONVERSATION_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: event.conversation_id }),
      });
      const endData = await endRes.json();
      console.log('Called end-conversation:', JSON.stringify(endData, null, 2));
    }

    return new Response('OK', { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}) 