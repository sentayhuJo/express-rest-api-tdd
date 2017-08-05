const config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost:27017/test",
}
module.exports = config;
