const config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/event-api",
	test_port: 3001,
	test_db: "mongodb://localhost/event-test-api"
}
module.exports = config;
