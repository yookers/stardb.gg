import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load = async ({ fetch }) => {
	const response = await fetch(`${PUBLIC_SERVER_API_URL}/scores`);
	//const response = await fetch('/scores-sample.json');
	const json = await response.json();
	const leaderboardData = json.scores;
	return {
		leaderboardData
	};
};
