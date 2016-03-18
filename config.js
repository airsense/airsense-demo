var config = {}

config.host = process.env.HOST || "https://airsense.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "1vLHpmN8J8l5tbcOtS8r6jtCOh+eiTjcH6HQMuYXOk+9LPhR2KRDd8O/dNoO7+q1qNjquC7gDJVyHtTwRk076g==";
config.databaseId = "EnviroData";
config.collectionId = "Data";

module.exports = config;