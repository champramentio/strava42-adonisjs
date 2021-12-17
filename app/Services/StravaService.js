const axios = require("axios");
const Env = use("Env");

class StravaService {
	async getActivites(auth, params = null) {
		const url = `${Env.get("STRAVA_BASE_API_URL")}/athlete/activities?${params}`;

		const result = await axios({
			url,
			method: "GET",
			headers: {
				Authorization: auth
			}
		})
			.then(res => res.data)
			.catch(err => {
				return { error: err.message };
			});

		return result;
	}

	async postActivity(auth, data) {
		const result = await axios({
			url: `${Env.get("STRAVA_BASE_API_URL")}/activities`,
			method: "POST",
			headers: {
				Authorization: auth
			},
			data
		})
			.then(res => res.data)
			.catch(err => {
				return { error: err.message };
			});

		return result;
	}

	async auth(code) {
		const result = await axios({
			url: `${Env.get("STRAVA_BASE_API_URL")}/oauth/token`,
			method: "POST",
			data: {
				client_id: Env.get("CLIENT_ID"),
				client_secret: Env.get("CLIENT_SECRET"),
				code,
				grant_type: "authorization_code"
			}
		})
			.then(res => res.data)
			.catch(err => {
				return { error: err.message };
			});

		return result;
	}

	async postRefreshToken(refreshToken) {
		const result = await axios({
			url: `${Env.get("STRAVA_BASE_API_URL")}/oauth/token`,
			method: "POST",
			data: {
				client_id: Env.get("CLIENT_ID"),
				client_secret: Env.get("CLIENT_SECRET"),
				refresh_token: refreshToken,
				grant_type: "refresh_token"
			}
		})
			.then(res => res.data)
			.catch(err => {
				return { error: err.message };
			});

		return result;
	}

	async logout(auth) {
		const result = await axios({
			url: `${Env.get("STRAVA_BASE_API_URL")}/oauth/deauthorize`,
			method: "POST",
			headers: {
				Authorization: auth
			}
		})
			.then(res => res.data)
			.catch(err => {
				return { error: err.message };
			});

		return result;
	}
}

module.exports = new StravaService();
