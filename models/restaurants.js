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
    required: false
  },
  category: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
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