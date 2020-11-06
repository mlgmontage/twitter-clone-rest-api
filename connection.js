const connection = require("knex")({
  client: 'sqlite3',
  connection: {
    filename: "./db/storage.sqlite"
  },
  useNullAsDefault: true
})

module.exports = connection