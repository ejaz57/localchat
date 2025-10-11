<script>
  import { currentModel } from '$lib/stores';
  import { onMount } from 'svelte';

  let models = [];
  let loading = false;

  const OLLAMA_BASE_URL = 'http://localhost:11434';

  async function fetchModels() {
    loading = true;
    try {
      const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      const data = await res.json();
      models = data.models.map(m => m.name.split(':')[0]);
      if (models.length > 0 && !models.includes($currentModel)) {
        currentModel.set(models[0]);
      }
    } catch (e) {
      console.error('Failed to fetch models:', e);
    }
    loading = false;
  }

  onMount(fetchModels);
</script>

<div class="mb-4">
  <label class="block text-sm font-medium mb-1">Модель:</label>
  <select
    bind:value={$currentModel}
    class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
  >
    {#each models as model}
      <option value={model}>{model}</option>
    {:else}
      <option disabled>Загрузка...</option>
    {/each}
  </select>
</div>
