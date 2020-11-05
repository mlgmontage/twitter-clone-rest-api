const connection = require("knex")({
  client: 'sqlite3',
  connection: {
    filename: "./db/storage.sqlite"
  }
})

module.exports = connection