import { writable } from 'svelte/store';

export const isSidebarExpanded = writable(false);
export const mobileSidebarToggle = writable(false);
export const searchResults = writable(null);
export const isUserLoggedIn = writable(false);