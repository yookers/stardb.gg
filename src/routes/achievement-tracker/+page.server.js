import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load = async ({ fetch, locals, cookies }) => {
    const response = await fetch(`${PUBLIC_SERVER_API_URL}/achievements`);
    let achievementsData = await response.json();

    if (locals.user) {
        const id = cookies.get('id');
        const completedResponse = await fetch(`${PUBLIC_SERVER_API_URL}/users/achievements`, {
            headers: {
                cookie: `id=${id}`,
            },
        });
        const completedAchievements = await completedResponse.json();

        // Iterate over each category of achievements
        achievementsData = achievementsData.map(category => {
            return {
                ...category,
                // Iterate over each achievement group in this category
                achievements: category.achievements.map(group => {
                    // Iterate over each achievement in this group
                    const achievements = group.map(achievement => {
                        // Check if this achievement is in the list of completed achievements
                        const completed = completedAchievements.includes(achievement.id);
                        return { ...achievement, completed };
                    });
                    return achievements;
                })
            };
        });
    } else {
        // No user is logged in, so all achievements are marked as not completed
        achievementsData = achievementsData.map(category => ({
            ...category,
            achievements: category.achievements.map(group => 
                group.map(achievement => ({ ...achievement, completed: false }))
            )
        }));
    }

    return { achievementsData } ;
};