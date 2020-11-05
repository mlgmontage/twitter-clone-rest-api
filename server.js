const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const volleyball = require("volleyball")

// Middlewares
app.use(volleyball)

// Routes
app.get('/', (req, res) => {
  res.json({
    hello: "world"
  })
} )

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})