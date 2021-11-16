const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmFzYW50aHJhbSIsImEiOiJja3N0MDR1OHAxMXAxMnVtZHd2Z3N5Ym0zIn0.afESYMzUM8qw9zSvS5UFiw&limit=1'

   //request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        //} else if (!response.body.features) {
        } else if (!body.features) {    
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                //latitude: response.body.features[0].center[1],
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode