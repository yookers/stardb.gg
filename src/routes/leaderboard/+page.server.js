const apiURL = import.meta.env.VITE_SERVER_API_URL;

export const load = async ({ fetch }) => {
	const response = await fetch(apiURL);
	//const response = await fetch('https://stardb.gg/api/scores');
	//const response = await fetch('/scores-sample.json');
	const json = await response.json();
	const leaderboardData = json.scores;
	return {
		leaderboardData
	};
};

export const prerender = false;