// import mongoose for mongodb connection
const db = require('../../config/mongoose')
// import schema model
const Restaurants = require('../restaurants')
// import default restaurant json
const defaultRestaurant = require('../restaurant.json')
console.log(defaultRestaurant)


db.once('open', () => {
  console.log('mongodb connected!')
  Restaurants.insertMany(defaultRestaurant.results)
})


