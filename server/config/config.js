require("dotenv").config()

module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "crm",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "root",
    database: "crm",
    host: "localhost",
    dialect: "postgres"
  }
}
