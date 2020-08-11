require("dotenv").config();
const DB_NAME = process.env.DB_NAME || "smashtracker";

const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const db = require("pg-promise")(options);

module.exports = db({
  database: DB_NAME,
  port: 5432,
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
});
