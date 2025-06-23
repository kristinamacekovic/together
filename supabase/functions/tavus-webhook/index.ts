import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const END_CONVERSATION_FUNCTION_URL = 'https://jsiavohlypmyifvuxnen.functions.supabase.co/end-conversation';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const event = await req.json()
    console.log('Received Tavus webhook event:', JSON.stringify(event, null, 2))

    // If this is a system.shutdown event, trigger end-conversation
    if (event.event_type === 'system.shutdown' && event.conversation_id) {
      const endRes = await fetch(END_CONVERSATION_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: event.conversation_id }),
      });
      const endData = await endRes.json();
      console.log('Called end-conversation:', JSON.stringify(endData, null, 2));
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}) 