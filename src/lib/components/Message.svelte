<script>
  import { marked } from 'marked';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-python';
  import 'prismjs/themes/prism-tomorrow.css';

  export let message;

  $: html = marked.parse(message.content || '');

  // Подсветка кода после рендеринга
  import { onMount } from 'svelte';
  onMount(() => {
    Prism.highlightAll();
  });
</script>

<div class="mb-4 flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
  <div class="max-w-3xl px-4 py-2 rounded-lg {message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}">
    {@html html}
  </div>
</div>
