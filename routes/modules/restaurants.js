// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import Restaurants model
const Restaurants = require('../../models/restaurants')

// stylesheets
const detail = 'detail'
const create = 'create'
const edit = 'edit'

// create page
router.get('/new', (req, res) => {
  res.render('create', { stylesheet: create })
})

// detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
                    .lean()
                    .then(restaurant => {
                      res.render('detail', { restaurant: restaurant, stylesheet: detail })
                    })
                    .catch(error => console.log(error))

})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
                    .lean()
                    .then(restaurant => {
                      res.render('edit', { restaurant: restaurant, stylesheet: edit })
                    })
                    .catch(error => console.log(error))

})

// POST
router.post('/', (req, res) => {
  const newRestaurant = req.body
  const defaultImage = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5630/04.jpg'
  newRestaurant.image = newRestaurant.image || defaultImage
  return Restaurants.create(newRestaurant)
                    .then(res.redirect('/'))
                    .catch(error => console.log(error))
})

// edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body
  return Restaurants.findByIdAndUpdate(id, editRestaurant)
                    .then(() => res.redirect('/'))
                    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findByIdAndRemove(id , res.redirect('/'))
                    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router