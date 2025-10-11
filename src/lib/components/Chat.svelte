<script>
  import { messages, currentModel, darkMode } from '$lib/stores';
  import Message from './Message.svelte';
  import ModelSelector from './ModelSelector.svelte';
  import { onMount } from 'svelte';

  let input = '';
  let isLoading = false;

  // Тема
  $: document.documentElement.classList.toggle('dark', $darkMode);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    messages.update(m => [...m, userMessage]);
    input = '';
    isLoading = true;

    const history = $messages;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: $currentModel, messages: history })
    });

    if (!response.ok) {
      messages.update(m => [...m, { role: 'assistant', content: 'Ошибка: не удалось подключиться к модели.' }]);
      isLoading = false;
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = { role: 'assistant', content: '' };
    messages.update(m => [...m, assistantMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message?.content) {
            assistantMessage.content += json.message.content;
            messages.update(m => [...m.slice(0, -1), assistantMessage]);
          }
        } catch (e) {
          console.warn('Invalid JSON:', line);
        }
      }
    }

    isLoading = false;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="max-w-4xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4 dark:text-white">LocalChat</h1>
  <ModelSelector />

  <div class="border rounded-lg h-[60vh] overflow-y-auto p-4 mb-4 bg-white dark:bg-gray-800">
    {#if $messages.length === 0}
      <p class="text-gray-500 dark:text-gray-400">Напишите сообщение, чтобы начать чат...</p>
    {:else}
      {#each $messages as message (message.id || message.content)}
        <Message {message} />
      {/each}
    {/if}
  </div>

  <form on:submit|preventDefault={sendMessage}>
    <textarea
      bind:value={input}
      on:keydown={handleKeyDown}
      placeholder="Введите ваш вопрос..."
      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      rows="2"
      disabled={isLoading}
    ></textarea>
    <button
      type="submit"
      class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      disabled={isLoading || !input.trim()}
    >
      {isLoading ? 'Отправка...' : 'Отправить'}
    </button>
  </form>
</div>
