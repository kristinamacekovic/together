/// <reference path="../types.d.ts" />
// @ts-ignore - Deno HTTP URL imports work at runtime
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
// @ts-ignore - ESM.sh imports work at runtime in Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY')
const TAVUS_REPLICA_ID = Deno.env.get('TAVUS_REPLICA_ID')
const TAVUS_PERSONA_ID = Deno.env.get('TAVUS_PERSONA_ID')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const { 
      learning_objectives, 
      study_subjects, 
      preferred_session_length,
      study_experience,
      challenges,
      motivation_factors
    } = await req.json()

    // Ensure array fields are actually arrays before joining
    const safeJoin = (arr: any) => (Array.isArray(arr) ? arr.join(', ') : '');

    const conversational_context = `
      The user wants to have a study session.
      Their learning objective is: ${learning_objectives || 'Not specified'}.
      They are studying: ${safeJoin(study_subjects) || 'Not specified'}.
      Their preferred session length is ${preferred_session_length || 'Not specified'} minutes.
      Their study experience is: ${study_experience || 'Not specified'}.
      Their challenges are: ${safeJoin(challenges) || 'Not specified'}.
      Their motivation is: ${safeJoin(motivation_factors) || 'Not specified'}.
      Be an encouraging and helpful study partner.
    `;

    // Dynamically get project ref from SUPABASE_URL instead of VITE_SUPABASE_URL
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    let projectRef = '';
    if (supabaseUrl) {
      // Example: https://<project-ref>.supabase.co
      const match = supabaseUrl.match(/^https:\/\/([^.]+)\.supabase\.co/);
      if (match) {
        projectRef = match[1];
      }
    }
    const callback_url = projectRef ? `https://${projectRef}.functions.supabase.co/tavus-webhook` : '';

    // Log the environment variables and payload for debugging
    console.log('TAVUS_REPLICA_ID:', TAVUS_REPLICA_ID);
    console.log('TAVUS_PERSONA_ID:', TAVUS_PERSONA_ID);
    console.log('TAVUS_API_KEY:', TAVUS_API_KEY ? 'set' : 'not set');
    console.log('USER DEBUG:', {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
      full_name: user.user_metadata?.full_name
    });
    const properties = {
      max_call_duration: preferred_session_length ? preferred_session_length * 60 : undefined, // in seconds
      participant_left_timeout: 60, // in seconds
    };
    console.log('Tavus payload:', {
      replica_id: TAVUS_REPLICA_ID,
      persona_id: TAVUS_PERSONA_ID,
      conversational_context,
      conversation_name: `Study Session with ${user.user_metadata?.full_name || user.email || user.id} on ${new Date().toLocaleString()}`,
      callback_url,
      properties,
    });

    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify({
        replica_id: TAVUS_REPLICA_ID,
        persona_id: TAVUS_PERSONA_ID,
        conversational_context,
        conversation_name: `Study Session with ${user.user_metadata?.full_name || user.email || user.id} on ${new Date().toLocaleString()}`,
        callback_url,
        properties,
      }),
    })

    if (!tavusResponse.ok) {
      const errorData = await tavusResponse.json();
      throw new Error(`Tavus API error: ${tavusResponse.status} ${JSON.stringify(errorData)}`);
    }

    const tavusData = await tavusResponse.json()

    const { data: sessionData, error: dbError } = await supabaseClient
      .from('sessions')
      .insert({
        user_id: user.id,
        title: tavusData.conversation_name,
        planned_duration: preferred_session_length,
        status: 'planned',
        conversation_id: tavusData.conversation_id,
        conversation_url: tavusData.conversation_url,
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Throw an error to ensure the frontend knows the operation failed
      throw new Error(`Database insert failed: ${dbError.message}`);
    }

    return new Response(JSON.stringify({ ...tavusData, session_id: sessionData?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}) 