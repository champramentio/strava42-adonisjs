const Env = use("Env");

module.exports = {
	host: Env.get("DB_HOST", "localhost"),
	port: Env.get("DB_PORT", 27017),
	protocol: Env.get("DB_PROTOCOL", "mongodb"),
	username: Env.get("DB_USER", "admin"),
	password: Env.get("DB_PASSWORD", ""),
	dbName: Env.get("DB_DATABASE", "adonis")
};
