const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
require("dotenv").config()

const app = express()

const mainRoutes = require("./routes/main")
const createRoutes = require("./routes/create")
const apiRoutes = require("./routes/api")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: process.env.SECRET || "n0-0ne-kn0ws",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
  })
)

app.use(flash())
app.use((req, res, next) => {
  res.locals.error_messages = req.flash("error_messages")
  next()
})

app.use(expressLayouts)

app.use("/", mainRoutes)
app.use("/api", apiRoutes)
app.use("/create", createRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
})
