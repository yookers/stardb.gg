import { writable } from 'svelte/store';

export const sidebarState = writable('collapsed'); // 'closed', 'collapsed', 'expanded'

export const searchResults = writable(null);

export const isUserLoggedIn = writable(false);
export const isUserAdmin = writable(false);

export const currentInterface = writable(null);
