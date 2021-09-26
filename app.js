// import express
const express = require('express')
// import express-handlebars
const exphbs = require('express-handlebars')

// import method-override
const methodOverride = require('method-override')
// import routes
const routes = require('./routes')
// import mongoose from config
require('./config/mongoose')



// create express server
const app = express()
// set connection port
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// static files
app.use(express.static('./public'))
// use express built-in body parser for post request
app.use(express.urlencoded({extended:true}))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// setting route
app.use(routes)

// setting port to which server listens
app.listen( 3000 , () => {
  console.log(`youre listening to http://localhost:${port}`)
})