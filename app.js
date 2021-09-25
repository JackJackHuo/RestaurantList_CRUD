// import mongoose for mongodb connection
const mongoose = require('mongoose')
// import express
const express = require('express')
// import express-handlebars
const exphbs = require('express-handlebars')
// import Restaurants model
const Restaurants = require('./models/restaurants')

// stylesheets
const main = 'main'
const detail = 'detail'
const create = 'create'
const edit = 'edit'
const search = 'search'


// create express server
const app = express()
// set connection port
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// static files
app.use(express.static('./public'))
// import body parser for post request
app.use(express.urlencoded({extended:true}))

// MODEL
// connect to mongodb
mongoose.connect('mongodb://localhost/restaurants-list')
// aquire connrction state
const db = mongoose.connection

db.on('error' , () => {
  console.log('mongodb error!')
})
db.once('open' , () => {
  console.log('mongodb connected!')
})



// VIEW
// setting route
// GET
app.get('/' , (req ,res) => {
  return Restaurants.find()
                    .lean()
                    .then(restaurants => {
                      res.render('index', { restaurants: restaurants, stylesheet: main})
                    })
                    .catch(error => console.log(error))
  
})
// create page
app.get('/restaurants/new' , (req ,res) => {
  res.render('create', { stylesheet: create})
})

// detail page
app.get('/restaurants/:id' , (req ,res) => {
  const id = req.params.id
  return Restaurants.findById(id)
                    .lean()
                    .then(restaurant => {
                      res.render('detail', {restaurant : restaurant , stylesheet : detail})
                    })
                    .catch(error => console.log(error))
  
})

// edit page
app.get('/restaurants/:id/edit' , (req , res) => {
  const id = req.params.id
  return Restaurants.findById(id)
                    .lean()
                    .then(restaurant => {
                      console.log(restaurant)
                      res.render('edit', {restaurant : restaurant , stylesheet : edit})
                    })
                    .catch(error => console.log(error))
  
})

// search
app.get('/search' , (req , res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  return Restaurants.find()
                    .lean()
                    .then(restaurants => {
                      console.log(restaurants)
                      const array = restaurants.filter( restaurant => restaurant.name.trim().toLocaleLowerCase().includes(keyword))
                      res.render('search', { array, keyword, stylesheet: search})
                    })
})

// POST
app.post('/restaurants' , (req , res) => {
  const newRestaurant = req.body
  return Restaurants.create({ 
                      name: newRestaurant.name , 
                      name_en: newRestaurant.name_en,
                      category: newRestaurant.category,
                      image: newRestaurant.image,
                      location: newRestaurant.location,
                      phone: newRestaurant.phone,
                      image: newRestaurant.image,
                      google_map: newRestaurant.google_map,
                      rating: +newRestaurant.rating,
                      description: newRestaurant.description
                    })
                    .then(res.redirect('/'))
                    .catch(error => console.log(error))

})

// edit
app.post('/restaurants/:id/edit' , (req , res) => {
  const id = req.params.id
  const editRestaurant = req.body
  return Restaurants.findById(id)
                    .then(restaurant => {
                      restaurant.name = editRestaurant.name,
                      restaurant.name_en = editRestaurant.name_en,
                      restaurant.category = editRestaurant.category,
                      restaurant.image = editRestaurant.image,
                      restaurant.location = editRestaurant.location,
                      restaurant.phone = editRestaurant.phone,
                      restaurant.image = editRestaurant.image,
                      restaurant.google_map = editRestaurant.google_map,
                      restaurant.rating = +editRestaurant.rating,
                      restaurant.description = editRestaurant.description
                      return restaurant.save()
                    })
                    .then(() => res.redirect('/'))
                    .catch(error => console.log(error))
})
// delete
app.post('/restaurants/:id/delete' , (req , res) => {
  const id = req.params.id
  return Restaurants.findById(id)
                    .then(restaurant => restaurant.remove())
                    .then(() => res.redirect('/'))
                    .catch(error => console.log(error))
})
app.listen( 3000 , () => {
  console.log(`youre listening to http://localhost:${port}`)
})