export const load = async ({ fetch }) => {
	const response = await fetch('https://stardb.gg/api/scores');
	const json = await response.json();
	const leaderboardData = json.scores.map((item, index) => ({ ...item, rank: index + 1 }));
	return {
		leaderboardData
	};
};
