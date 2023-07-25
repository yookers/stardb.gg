import { writable } from 'svelte/store';

export const sidebarState = writable('collapsed'); // 'closed', 'collapsed', 'expanded'
export const currentInterface = writable(null); // 'mobile', 'tablet', 'desktop', 'desktop-xl', 'desktop-2xl'

export const searchResults = writable(null);
