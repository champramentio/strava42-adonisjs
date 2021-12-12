"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const { MongoClient } = require("mongodb");

class MongoProvider extends ServiceProvider {
	register() {
		this.app.singleton("MongoClient", () => {
			const Config = this.app.use("Adonis/Src/Config");
			const connection = new (require("../src/Mongodb"))({ Config, MongoClient });
			return connection;
		});
	}

	boot() {
		/** @type {import('../src/AdonisMongodb')} */
		const Client = this.app.use("MongoClient");
		Client.connect();
	}
}

module.exports = MongoProvider;
