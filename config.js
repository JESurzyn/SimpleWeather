const dotenv = require('dotenv')
dotenv.config();
module.exports = {
    apiKey: process.env.API_KEY,
    sessSecret: process.env.SESS_SECRET
};