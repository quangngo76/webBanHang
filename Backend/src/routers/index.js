const login = require('./login')
const home = require('./home')
const register = require('./register')
const product = require('./product')
const cart = require('./cart')
const order = require('./order')
const user = require('./user')
const data = require('./data')

function route(app) {
    app.use('/data', data)
    app.use('/user', user)
    app.use('/cart', cart)
    app.use('/product', product)
    app.use('/register', register)
    app.use('/login', login)
    app.use('/order', order)
    app.use('/', home)

}

module.exports = route