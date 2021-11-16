const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=15c2323abb02a122bc61e63073772f31&query=' + latitude + ',' + longitude 


    //request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        //} else if (response.body.error) {
        } else if (body.error) {    
            callback('Unable to find location', undefined)
        } else {
            //callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " celsius out.")
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " celsius out.")
        }
    })
}

module.exports = forecast