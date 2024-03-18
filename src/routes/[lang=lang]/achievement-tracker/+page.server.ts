import type { PageServerLoad } from './$types';
import { getLocaleFromURL } from '$lib/utils';
import type { TrackerAchievement, AchievementTrackerData, Series, SeriesSummary, SeriesData, AchievementGroup } from '$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { PRIVATE_SERVER_API_URL } from '$env/static/private';

export const load: PageServerLoad = (async ({ fetch, locals, cookies, url }) => {
	try {
		const locale = getLocaleFromURL(url);
		const apiUrl = `${PRIVATE_SERVER_API_URL}/pages/achievement-tracker?lang=${locale}`;

		// Prevent fetch waterfalls by fetching all data in parallel
		const achievementPromise = fetch(apiUrl);

		let completedPromise: Promise<Response> | undefined;
		if (locals.user) {
			const id = cookies.get('id');
			completedPromise = fetch(`${PUBLIC_SERVER_API_URL}/users/me/achievements`, {
				headers: {
					cookie: `id=${id}`
				}
			});
		}

		const achievementResponse = await achievementPromise;
		if (!achievementResponse.ok) {
			return { error: { status: 400, message: 'Oops! Could not get achievements data from the server.' } };
		}

		const rawAchievementsData = await achievementResponse.json();
		const achievementsData: AchievementTrackerData = {
			series: rawAchievementsData.series
		};

		console.log(achievementsData);

		const seriesData: SeriesData = {
			series: [],
			total_achievement_count: rawAchievementsData.achievement_count,
			current_achievement_count: 0,
			total_jade_count: rawAchievementsData.jade_count,
			current_jade_count: 0,
			user_count: rawAchievementsData.user_count,
			language: rawAchievementsData.language,
			versions: rawAchievementsData.versions
		};

		let completedAchievements: number[] = [];
		if (completedPromise) {
			const completedResponse = await completedPromise;
			if (!completedResponse.ok) {
				return { error: { status: 400, message: "Oops! Could not get the user's completed achievements from the server." } };
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
			series.achievement_groups = series.achievement_groups.map((achievementGroup: AchievementGroup) => {
				let completedGroupID: number | undefined;
				const updatedAchievements = achievementGroup.achievements.map((achievement: TrackerAchievement) => {
					if (completedAchievements.includes(achievement.id)) {
						achievement.completed = true;
						if (achievementGroup.achievements.length > 1) {
							// If the achievement is part of a group
							completedGroupID = achievement.id;
						}
						seriesSummary.current_achievement_count++;
						seriesSummary.current_jade_count += achievement.jades;
						seriesData.current_achievement_count++;
						seriesData.current_jade_count += achievement.jades;
					} else {
						achievement.completed = false;
					}
					return achievement;
				});
				return { achievements: updatedAchievements, completed_group_id: completedGroupID };
			});
			seriesData.series.push(seriesSummary);
		});
		return { achievementsData: achievementsData.series, seriesData };
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong. Please try again later. :(' } };
	}
}) satisfies PageServerLoad;
