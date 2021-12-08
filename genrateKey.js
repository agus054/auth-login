const crypto = require("crypto");

const secret_key_JWT_token = crypto.randomBytes(32).toString("base64");
const secret_key_JWT_refresh_token = crypto.randomBytes(32).toString("base64");
const secret_key_payload = crypto.randomBytes(16).toString("base64");
console.table([secret_key_JWT_token, secret_key_JWT_refresh_token, secret_key_payload]);
