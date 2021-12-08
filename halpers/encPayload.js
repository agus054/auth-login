const crypto = require("crypto");
const { Base64 } = require("js-base64");


function bArr(str) {
    let data = [];
    for (let i = 0; i < str.length; i++) {
        data.push(str.charCodeAt(i));
    };

    return data
};

module.exports = {
    encryptPayload: (payload) => {
        const key = bArr(Base64.atob(process.env.secret_key_payload));
        
        let cc = crypto.createCipher('aes-128-ecb', new Buffer.from(key));
        const encrypted = Buffer.concat([cc.update(payload, 'utf8'), cc.final()]).toString('hex');
        return encrypted;
    },
    decryptPayload: (payload) => {
        const key = bArr(Base64.atob(process.env.secret_key_payload));
        
        let cc = crypto.createDecipher('aes-128-ecb', new Buffer.from(key));
        const decrypted = Buffer.concat([cc.update(payload, 'hex'), cc.final()]).toString('utf-8');

        return decrypted;
    }
}