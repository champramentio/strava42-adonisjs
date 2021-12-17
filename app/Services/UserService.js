const StravaService = use("App/Services/StravaService");
const MongoClient = use("MongoClient");
const TIMESTAMP = 3600 * 24 * 3 * 1000; // 3 days

class UserService {
	async getConnected(token) {
		//get last activities
		const result = await StravaService.getActivites(`Bearer ${token}`, `after=${(new Date().getTime() - TIMESTAMP) / 1000}`);

		//save to db and avoid duplicates
		for (const iterator of result) {
			await MongoClient.createDocumentIfNotExists("activities", { id: iterator.id }, iterator);
		}

		return result;
	}
}

module.exports = new UserService();
