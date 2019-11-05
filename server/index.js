require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const app = express()

let {SERVER_PORT, SECRET_SESSION} = process.env

app.use(express.json())
app.use (
    session({
        secret: SECRET_SESSION,
        resave: false,
        saveUninitialized: true
    })
)
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagController.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
app.post('/api/cart/:id', cartController.add)
app.post('/api/cart/checkout', cartController.checkout)
app.delete('/api/cart/:id', cartController.delete)
app.get('api/search', searchController.search)


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} dollars in ma pocket`)
})