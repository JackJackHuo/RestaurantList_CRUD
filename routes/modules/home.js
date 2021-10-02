// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import Restaurants model
const Restaurants = require('../../models/restaurants')

// stylesheets
const main = 'main'
const search = 'search'

router.get('/', (req, res) => {
  const {name , rating , category} = req.query
  return Restaurants.find()
                    .lean()
                    .sort({ name: 'asc' }) //在MongoDB將name屬性作正排序(asc)，反之(desc)
                    .then(restaurants => {
                      res.render('index', { restaurants: restaurants, stylesheet: main })
                    })
                    .catch(error => console.log(error))

})

router.post('/filter', (req, res) => {
  const { sort, filterRating, filterCategory } = req.body  // 解構賦值
  sortRule = {
    name_asc:{name:'asc'},
    name_desc:{name:'desc'},
    rating_asc: { rating: 'asc'},
    rating_desc: { rating: 'desc'}
  }
  // rating => grater than and equal to filterRating(selected by client) default rating = 0; 
  // category => filterCategory(selected by client); '.' means any string
  return Restaurants.find({$and: [{ rating: { $gte: filterRating || 0}}, {category: { $regex: filterCategory || '.'} }]})
                    .lean()
                    .sort(sortRule[sort] || sortRule.name_asc) //預設為 name:'asc'
                    .then(restaurants => {
                      res.render('index', { restaurants: restaurants, stylesheet: main })
                    })
                    .catch(error => console.log(error))

})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // 使用$regex正規表示法來處理搜尋字串,options設定分辨大小寫
  return Restaurants.find({ name: { $regex: keyword, $options: 'i' } })
                    .lean()
                    .then(restaurants => {
                      res.render('search', { restaurants, keyword, stylesheet: search })
                      // return Restaurants.find()
                      //                   .lean()
                      //                   .then(restaurants => {
                      //                     const array = restaurants.filter(restaurant => restaurant.name.trim().toLocaleLowerCase().includes(keyword))
                      //                     res.render('search', { array, keyword, stylesheet: search })
                    })
})


// 匯出路由器
module.exports = router