// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import Restaurants model
const Restaurants = require('../../models/restaurants')

// stylesheets
const main = 'main'

router.get('/', (req, res) => {
  return Restaurants.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants: restaurants, stylesheet: main })
    })
    .catch(error => console.log(error))

})
// 匯出路由器
module.exports = router