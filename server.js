const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const volleyball = require("volleyball")
const cors = require("cors")

// Middlewares
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api/routes/users', require('./api/routes/users'))

// connection
const knex = require("./connection")

// Routes
app.get('/', async (req, res) => {
  knex("Users").then(data => console.log(data))
  res.json({
    hello: "world"
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})