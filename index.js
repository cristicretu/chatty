import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

// view engine for handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen('8000', () => {
  console.log("Server listening on Port 8000")
})
