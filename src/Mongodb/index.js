class AdonisMongodb {
	constructor({ Config, MongoClient }) {
		this.Config = Config;
		this.protocol = this.Config.get("mongodb.protocol") || "mongodb";
		this.host = this.Config.get("mongodb.host");
		this.port = this.Config.get("mongodb.port");
		this.username = this.Config.get("mongodb.username");
		this.password = this.Config.get("mongodb.password");
		this.dbName = this.Config.get("mongodb.dbName");
		this.options = this.Config.get("mongodb.options");
		this.url = `${this.protocol}://${this.username}:${this.password}@${this.host}${this.port ? ":" + this.port : ""}${this.dbName ? "/" + this.dbName : ""}`;
		this.Client = MongoClient;
	}

	isConnected() {
		return !!this.db;
	}

	async connect() {
		if (this.isConnected()) {
			console.log("Client is already connected, returning...");
			return this.db;
		}
		await this.Client.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
			if (err) throw new Error(err);

			this.db = client.db(this.dbName);
			this.Client = client;
			console.log(`Mongodb connected successfully to ${this.dbName}`);
		});
		return this.db;
	}

	close() {
		this.Client.close();
		console.log(`Connection closed successfully.`);
	}

	async createDocument(collection, document) {
		return await this.db.collection(collection).insertOne({ createdAt: new Date(), updatedAt: new Date(), ...document });
	}

	async createDocumentIfNotExists(collection, idObj, document) {
		return await this.db.collection(collection).updateOne(idObj, { $setOnInsert: { createdAt: new Date(), updatedAt: new Date(), ...document } }, { upsert: true });
	}
}

module.exports = AdonisMongodb;
