// import mongoose for mongodb connection
const mongoose = require('mongoose')
// import schema model
const Restaurants = require('../restaurants')
// import default restaurant json
const defaultRestaurant = require('../restaurant.json')
console.log(defaultRestaurant)


// connect to mongodb
mongoose.connect('mongodb://localhost/restaurants-list')

// aquire connrction state
const db = mongoose.connection

//setting action for failure scenerio
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  defaultRestaurant.results.forEach( restaurant => {
    Restaurants.create(
      {
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description
      }
    )
  }) 
})


