import { json } from '@sveltejs/kit';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

export async function POST({ request }) {
  const { model, messages } = await request.json();

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: true })
  });

  if (!response.ok) {
    return json({ error: 'Failed to fetch from Ollama' }, { status: 500 });
  }

  // Проксируем поток напрямую
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
