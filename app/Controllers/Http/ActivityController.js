"use strict";

const MongoClient = use("MongoClient");
const StravaService = require("../../Services/StravaService");

class ActivityController {
	async getList({ request, response }) {
		try {
			const auth = request.header("authorization");

			const result = await StravaService.getActivites(auth);
			if (result && result.error) return result;

			return response.json({
				success: "Activities have been fetched successfully",
				data: result
			});
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}

	async getAllList({ request, response }) {
		try {
			const params = request.get();

			const where = params.where ? Object.fromEntries([params.where.split(",")]) : {};
			const sort = params.sort ? Object.fromEntries([params.sort.split(",")]) : {};

			const result = await MongoClient.db.collection("activities").find(where).sort(sort).toArray();

			return response.json({
				success: "All activities have been fetched successfully",
				data: result
			});
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}

	async postAdd({ request, response }) {
		try {
			const formData = request.only(["name", "type", "start_date_local", "elapsed_time", "distance", "description", "trainer", "commute", "hide_from_home"]);

			const auth = request.header("authorization");

			const result = await StravaService.postActivity(auth, formData);
			if (result && result.error) return result;

			//save db
			await MongoClient.createDocument("activity", result);

			return response.json({
				success: "Activity has been created successfully",
				data: result
			});
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}
}

module.exports = ActivityController;
