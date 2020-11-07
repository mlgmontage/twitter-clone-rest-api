const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const volleyball = require("volleyball")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

// Middlewares
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api/routes/users', require('./api/routes/users'))
app.use('/api/routes/tweets', require('./api/routes/tweets'))
app.use('/api/routes/comments', require('./api/routes/comments'))

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