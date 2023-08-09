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
				admin: boolean;
				username: string;
			};
		}
	}
}

export {};

export type Achievement = {
	id: number;
	series: number;
	series_tag: string;
	series_name: string;
	tag: string;
	name: string;
	description: string;
	jades: number;
	hidden: boolean;
	version: string;
	comment?: string;
	reference?: string;
	difficulty?: string;
	gacha: boolean;
	percent: number;
	completed?: boolean;
};

export type AchievementGroup = {
	achievements: Achievement[];
	completed_group_id?: number | undefined;
};

export type Series = {
	series: string;
	achievement_count: number;
	jade_count: number;
	achievements: AchievementGroup[];
};

export type AchievementsGroupedData = {
	achievement_count: number;
	jade_count: number;
	series: Series[];
};

export type SeriesSummary = {
	name: string;
	total_achievement_count: number;
	current_achievement_count: number;
	total_jade_count: number;
	current_jade_count: number;
};

export type SeriesData = {
	series: SeriesSummary[];
	total_achievement_count: number;
	current_achievement_count: number;
	total_jade_count: number;
	current_jade_count: number;
};

export type SelectedSeries = SeriesSummary | 'Show All';

export enum AchievementDifficulty {
	ALL = 'all',
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}

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
