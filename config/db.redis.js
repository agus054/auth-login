const redis = require("redis");
const client = redis.createClient({
    port: process.env.PORT_REDIS,
    host: process.env.HOST_DB
});

client.on("error", (error) => {
    console.log(error);
})
client.on("connenct", () => {
    console.log("client Connect to redis..");
});
client.on("ready", () => {
    console.log("Client to connect to redis and ready to use")
});

module.exports = client;