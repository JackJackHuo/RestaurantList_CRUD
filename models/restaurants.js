// import mongoose for mongodb connection
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantsSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  }
})
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

module.exports = mongoose.model('Restaurants', restaurantsSchema)