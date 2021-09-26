// import mongoose for mongodb connection
const mongoose = require('mongoose')
// connect to mongodb
mongoose.connect('mongodb://localhost/restaurants-list')
// aquire connrction state
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db