export const load = async ({ fetch }) => {
    const response = await fetch('localhost:8000/api/scores');
    //const response = await fetch('/scores-sample.json');
    const json = await response.json();
    const leaderboardData = json.scores;
    return {
        leaderboardData
    };
};

export const prerender = false;
