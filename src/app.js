const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { get } = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


// Index.hbs file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Gyanendra Kumar"
    })
})

//about.hbs file
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Gyanendra Kumar"
    })
})

//help.hbs file
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'I am here to help everyone',
        title: 'Help',
        name: 'Gyanendra Kumar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Gyanendra Kumar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gyanendra Kumar',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})