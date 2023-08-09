import type { PageServerLoad } from './$types';
import type {
	Achievement,
	AchievementsGroupedData,
	Series,
	SeriesSummary,
	SeriesData,
	AchievementGroup
} from '$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load: PageServerLoad = (async ({ fetch, locals, cookies }) => {
	try {
		const achievementResponse = await fetch(`${PUBLIC_SERVER_API_URL}/achievements/grouped`);

		if (!achievementResponse.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}

		const rawAchievementsData = await achievementResponse.json();

		const achievementsData: AchievementsGroupedData = {
			achievement_count: rawAchievementsData.achievement_count,
			jade_count: rawAchievementsData.jade_count,
			series: rawAchievementsData.series.map((s: Series) => {
				return {
					series: s.series,
					achievement_count: s.achievement_count,
					jade_count: s.jade_count,
					achievements: s.achievements.map((ag) => {
						return { achievements: ag }; // For now, completed_group_id remains undefined
					})
				};
			})
		};

		const seriesData: SeriesData = {
			series: [],
			total_achievement_count: rawAchievementsData.achievement_count,
			current_achievement_count: 0,
			total_jade_count: rawAchievementsData.jade_count,
			current_jade_count: 0
		};

		let completedAchievements: number[] = [];
		if (locals.user) {
			const id = cookies.get('id');
			const completedResponse = await fetch(`${PUBLIC_SERVER_API_URL}/users/me/achievements`, {
				headers: {
					cookie: `id=${id}`
				}
			});

			if (!completedResponse.ok) {
				return { error: { status: 400, message: 'Oops! Something went wrong.' } };
			}
			completedAchievements = await completedResponse.json();
		}

		achievementsData.series.forEach((series: Series) => {
			const seriesSummary: SeriesSummary = {
				name: series.series,
				total_achievement_count: series.achievement_count,
				current_achievement_count: 0,
				total_jade_count: series.jade_count,
				current_jade_count: 0
			};

			series.achievements = series.achievements.map((achievementGroup: AchievementGroup) => {
				let completedGroupID: number | undefined;
				const updatedAchievements = achievementGroup.achievements.map(
					(achievement: Achievement) => {
						if (completedAchievements.includes(achievement.id)) {
							achievement.completed = true;
							completedGroupID = achievement.id;
							seriesSummary.current_achievement_count++;
							seriesSummary.current_jade_count += achievement.jades;
							seriesData.current_achievement_count++;
							seriesData.current_jade_count += achievement.jades;
						} else {
							achievement.completed = false;
						}
						return achievement;
					}
				);
				return { achievements: updatedAchievements, completed_group_id: completedGroupID };
			});
			seriesData.series.push(seriesSummary);
		});
		console.log(seriesData);
		return { achievementsData: achievementsData.series, seriesData };
	} catch (error) {
		console.log(error);
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
