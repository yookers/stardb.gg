// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			user: {
				username: string;
				email: string;
				admin: boolean;
				uids: string[];
			};
		}
	}
}

export {};

export type Achievement = {
	id: number;
	series: string;
	title: string;
	description: string;
	jades: number;
	hidden: boolean;
	version: string;
	comment?: string;
	difficulty?: string;
    set?: number;
	related: number[];
	percent: number;
	completed?: boolean;
	completedByRelation?: boolean;
};

export type AchievementGroupedSeries = {
	series: string;
	achievements: Achievement[][];
};

export enum DeviceInterface {
	MOBILE = 'MOBILE',
	TABLET = 'TABLET',
	DESKTOP = 'DESKTOP',
	DESKTOP_XL = 'DESKTOP_XL',
	DESKTOP_2XL = 'DESKTOP_2XL'
}

export enum SidebarState {
	CLOSED = 'CLOSED',
	COLLAPSED = 'COLLAPSED',
	EXPANDED = 'EXPANDED'
}

export enum MessageType {
	NONE = 'NONE',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	LOADING = 'LOADING',
	FAIL = 'FAIL'
}
