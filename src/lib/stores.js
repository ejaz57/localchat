import { writable } from 'svelte/store';

export const messages = writable([]);
export const currentModel = writable('llama3');
export const darkMode = writable(window.matchMedia('(prefers-color-scheme: dark)').matches);
