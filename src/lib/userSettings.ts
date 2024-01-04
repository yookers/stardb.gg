/* eslint-disable @typescript-eslint/no-explicit-any */
type Settings = {
	[key: string]: any;
};

const STORAGE_KEY = 'userSettings';

export function storeSettings(settings: Settings) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function loadSettings(): Settings {
	const storedSettings = localStorage.getItem(STORAGE_KEY);
	return storedSettings ? JSON.parse(storedSettings) : {};
}

export function setSettings(key: string, value: any): void {
	const settings = loadSettings();
	settings[key] = value;
	storeSettings(settings);
}

export function clearSettings() {
	localStorage.removeItem(STORAGE_KEY);
}
