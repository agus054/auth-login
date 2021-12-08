const client = require("../config/db.redis");

module.exports = {
    insertDbRedis : async (key, value) => {
        return await client.set(key, value, { EX:  60 * 60 * 24 });
    },
    getDbRedis: async (key) => {
        return await client.get(key);
    },
    deleteDbRedis: async (key) => {
        return await client.del(key);
    }
}