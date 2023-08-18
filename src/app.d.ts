// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			user: { username: string } | undefined;
		}
	}
}

export {};

export type DatabaseAchievement = {
    id: number;
    series: number;
    series_name: string;
    name: string;
    description: string;
    jades: number;
    hidden: boolean;
    version: string;
    comment?: string;
    reference?: string;
    difficulty?: string;
    video?: string;
    gacha: boolean;
    percent: number;
}

export type TrackerAchievement = {
	id: number;
	series: number;
	series_name: string;
	name: string;
	description: string;
	jades: number;
	hidden: boolean;
	version: string;
	difficulty?: string;
	gacha: boolean;
	percent: number;
	completed?: boolean;
};

export type AchievementGroup = {
	achievements: TrackerAchievement[];
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

export type MihomoAttribute = {
	display: number;
	field: string;
	icon: string;
	name: string;
	percent: boolean;
	type?: string;
	value: number;
	count?: number;
	step?: number;
};

export type MihomoCharacterRelicSet = {
	desc: string;
	icon: string;
	id: string;
	name: string;
	num: number;
	properties: MihomoAttribute[];
};

export type MihomoCharacterRelic = {
	icon: string;
	id: string;
	level: number;
	main_affix: MihomoAttribute;
	name: string;
	rarity: number;
	set_id: string;
	set_name: string;
	sub_affix: MihomoAttribute[];
};

export type MihomoCharacterSkillTree = {
	anchor: string;
	icon: string;
	id: string;
	level: number;
	max_level: number;
	parent: string | null;
};

export type MihomoCharacterSkill = {
	desc: string;
	effect: string;
	effect_text: string;
	element: {
		color: string;
		icon: string;
		id: string;
		name: string;
	};
	icon: string;
	id: string;
	level: number;
	max_level: number;
	name: string;
	simple_desc: string;
	type: string;
	type_text: string;
};

export type MihomoCharacterData = {
	additions: MihomoAttribute[];
	attributes: MihomoAttribute[];
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
		attributes: MihomoAttribute[];
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
		properties: MihomoAttribute[];
		rank: number;
		rarity: number;
	};
	name: string;
	path: {
		icon: string;
		id: string;
		name: string;
	};
	portrait: string;
	preview: string;
	promotion: number;
	properties: MihomoAttribute[];
	rank: number;
	rank_icons: string[];
	rarity: number;
	relic_sets: MihomoCharacterRelicSet[];
	relics: MihomoCharacterRelic[];
	skill_trees: MihomoCharacterSkillTree[];
	skills: MihomoCharacterSkill[];
};

export type MihomoPlayer = {
	avatar: { icon: string; id: number; name: string };
	friend_count: number;
	is_display: boolean;
	level: number;
	nickname: string;
	signature: string;
	space_info: {
		achievement_count: number;
		avatar_count: number;
		challenge_data: { maze_group_id: number; maze_group_index: number; pre_maze_group_index: number };
		light_cone_count: number;
		pass_area_progress: number;
	};
	uid: number;
	world_level: number;
};

export type MihomoProfileData = {
	characters: MihomoCharacterData[];
	player: MihomoPlayer;
	updated_at: string; // UTC format
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
	MOBILE,
	TABLET,
	DESKTOP,
	DESKTOP_XL,
	DESKTOP_2XL
}

export enum SidebarState {
	CLOSED,
	COLLAPSED,
	EXPANDED
}

export enum MessageType {
	NONE,
	SUCCESS,
	ERROR,
	LOADING,
	FAIL
}
