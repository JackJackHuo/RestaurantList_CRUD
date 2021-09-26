// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import Restaurants model
const Restaurants = require('../../models/restaurants')

// stylesheets
const search = 'search'

// search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  return Restaurants.find()
    .lean()
    .then(restaurants => {
      const array = restaurants.filter(restaurant => restaurant.name.trim().toLocaleLowerCase().includes(keyword))
      res.render('search', { array, keyword, stylesheet: search })
    })
})

// 匯出路由器
module.exports = router