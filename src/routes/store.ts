import { SidebarState, DeviceInterface } from '$types';
import { writable } from 'svelte/store';

export const sidebarState = writable<SidebarState>(SidebarState.COLLAPSED); // 'CLOSED', 'COLLAPSED', 'EXPANDED'
export const currentInterface = writable<DeviceInterface>(DeviceInterface.MOBILE); // 'MOBILE', 'TABLET', 'DESKTOP', 'DESKTOP_XL', 'DESKTOP_2XL'

export const searchResults = writable<string[]>([]);
