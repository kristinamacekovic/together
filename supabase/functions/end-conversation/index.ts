/// <reference path="../types.d.ts" />
// @ts-ignore - Deno HTTP URL imports work at runtime
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY')

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { conversation_id } = await req.json()
    if (!conversation_id) {
      return new Response(JSON.stringify({ error: 'Missing conversation_id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const tavusRes = await fetch(`https://tavusapi.com/v2/conversations/${conversation_id}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
    })

    const data = await tavusRes.json()
    return new Response(JSON.stringify(data), {
      status: tavusRes.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}) 