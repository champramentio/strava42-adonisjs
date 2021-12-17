"use strict";

const MongoClient = use("MongoClient");
const StravaService = require("../../Services/StravaService");
const EventEmitter = use("Event");

class ActivityController {
	async postConnect({ request, response }) {
		try {
			const formData = request.only(["code"]);

			const result = await StravaService.auth(formData.code);
			if (result && result.error) return result;

			//save db
			await MongoClient.createDocumentIfNotExists("users", { id: result.athlete.id }, result.athlete);

			//getting user
			EventEmitter.fire("user::connected", result.access_token);

			return {
				success: "You have connected your Strava account",
				data: result
			};
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}

	async postRefreshToken({ request, response }) {
		try {
			const formData = request.only(["refresh_token"]);
			const result = await StravaService.postRefreshToken(formData.refresh_token);
			if (result && result.error) return result;

			return {
				success: "Refresh token fetched successfully",
				data: result
			};
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}

	async postDisconnect({ request, response }) {
		try {
			const auth = request.header("authorization");

			const result = await StravaService.logout(auth);
			if (result && result.error) return result;

			return {
				success: "You have logout successfully",
				data: result
			};
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}
}

module.exports = ActivityController;
