import { SidebarState, DeviceInterface } from '$types';
import { writable } from 'svelte/store';

export const sidebarState = writable<SidebarState>(SidebarState.COLLAPSED); // 'CLOSED', 'COLLAPSED', 'EXPANDED'
export const currentInterface = writable<DeviceInterface>(DeviceInterface.DESKTOP); // 'MOBILE', 'TABLET', 'DESKTOP', 'DESKTOP_XL', 'DESKTOP_2XL'

export const locale = writable<string>('en');
