const express = require('express')
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Restaurant = require("./models/Restaurant")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})


const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))


// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})

// app.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     return res.redirect("/")
//   }

//   const keywords = req.query.keywords
//   const keyword = req.query.keywords.trim().toLowerCase()

//   const filterRestaurantsData = restaurantsData.filter(
//     data =>
//       data.name.toLowerCase().includes(keyword) ||
//       data.category.includes(keyword)
//   )
//   res.render("index", { restaurantsData: filterRestaurantsData, keywords })
// })

// app.get("/restaurants/:restaurantId", (req, res) => {
//   const { restaurantId } = req.params
//   const restaurantData = restaurantsData.find(
//     data => data.id === Number(restaurantId)
//   )
//   res.render("show", { restaurantData })
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})