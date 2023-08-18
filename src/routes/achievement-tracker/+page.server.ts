import type { PageServerLoad } from './$types';
import type { TrackerAchievement, AchievementsGroupedData, Series, SeriesSummary, SeriesData, AchievementGroup } from '$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { PRIVATE_API_KEY, PRIVATE_SERVER_API_URL } from '$env/static/private';

export const load: PageServerLoad = (async ({ fetch, locals, cookies, url }) => {
	try {
		const selectedLanguageID = url.searchParams.get('lang');
		const apiUrl = selectedLanguageID
			? `${PRIVATE_SERVER_API_URL}/achievement-tracker?lang=${selectedLanguageID}`
			: `${PRIVATE_SERVER_API_URL}/achievement-tracker`;

		// Prevent fetch waterfalls by fetching all data in parallel
		const achievementPromise = fetch(apiUrl, {
			headers: {
				authorization: `ApiKey ${PRIVATE_API_KEY}`
			}
		});

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
			user_count: rawAchievementsData.user_count,
			total_achievement_count: rawAchievementsData.achievement_count,
			current_achievement_count: 0,
			total_jade_count: rawAchievementsData.jade_count,
			current_jade_count: 0
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

			series.achievements = series.achievements.map((achievementGroup: AchievementGroup) => {
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

		return { achievementsData: achievementsData.series, seriesData, selectedLanguageID };
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong. Please try again later. :(' } };
	}
}) satisfies PageServerLoad;
