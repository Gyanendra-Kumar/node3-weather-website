const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9f930f45b20e4996e80a7a56918584fa&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Error: Unable to connect to Weather Service! ', undefined)
        } else if (response.body.error) {
            callback('Error: Unable to find the location! ', undefined)
        } else {
            callback(undefined, 'Temperature: ' + response.body.current.temperature + ' and weather code is '+response.body.current.weather_code
            )
        }
    })
}

module.exports = forecast