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
			} | undefined;
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
	user_count: number;
	total_achievement_count: number;
	current_achievement_count: number;
	total_jade_count: number;
	current_jade_count: number;
};

export type SelectedSeries = SeriesSummary | 'Show All';

export type MihomoCharacterAttribute = {
	display: number;
	field: string;
	icon: string;
	name: string;
	percent: boolean;
	type?: string;
	value: number;
    count?:  number;
    step?:   number;
};

export type MihomoCharacter = {
	additions: MihomoCharacterAttribute[];
	attributes: MihomoCharacterAttribute[];
	element: {
		color: string;
		icon: string;
		id: string;
		name: string;
	};
	icon: string;
	id: string;
	levels: number;
	light_cone: {
		attributes: MihomoCharacterAttribute[];
		icon: string;
		id: string;
		level: number;
		name: string;
		path: {
			icon: string;
			id: string;
			name: string;
		};
		portrait: string;
		preview: string;
		promotion: number;
		properties: MihomoCharacterAttribute[];
		rank: number;
		rarity: number;
	};
    name: string;
    path: {
        icon: string;
        id: string;
        name: string;
    }
    portrait: string;
    preview: string;
    promotion: number;
    properties: MihomoCharacterAttribute[];
};

export type MihomoPlayer = {
	avatar: { icon: string; id: number; name: string };
	friend_count: number;
	level: number;
	nickname: string;
	signature: string;
	space_info: { achievement_count: number; avatar_count: number; challenge_data: { pre_maze_group_index: number } };
};

export type MihomoProfileData = {
	charaters: MihomoCharacter[];
	player: MihomoPlayer;
	updated_at: string;
};

export type ErrorResponse = {
	status: number;
	message: string;
};

export type Language = {
	id: string;
	name: string;
};

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
