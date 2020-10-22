const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 5000
const user = require('./controllers/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', user)

app.listen(PORT, console.log(`Connected to PORT ${PORT}`))