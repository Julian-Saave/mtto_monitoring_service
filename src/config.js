const { config } = require('dotenv');
config();

module.exports = {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  },
  JWT_SECRET: process.env.JWT_SECRET,
  plc_ip: process.env.PLC_IP
  };