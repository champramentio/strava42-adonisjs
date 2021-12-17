"use strict";

const MongoClient = use("MongoClient");

class UserController {
	async getAllList({ request, response }) {
		try {
			const params = request.get();

			const where = params.where ? Object.fromEntries([params.where.split(",")]) : {};
			const sort = params.sort ? Object.fromEntries([params.sort.split(",")]) : {};

			const result = await MongoClient.db.collection("users").find(where).sort(sort).toArray();

			return response.json({
				success: "All users have been fetched successfully",
				data: result
			});
		} catch (error) {
			return response.json({
				error: error.message
			});
		}
	}
}

module.exports = UserController;
