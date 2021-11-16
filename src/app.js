const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { ppid } = require('process')
const app = express()

console.log(__dirname)
//console.log(path.join(__dirname, ('../..')))
//console.log(path.join(__dirname, ('../public')))

//Define paths for Express config
const publicDirPath = path.join(__dirname, ('../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Developer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Developer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'Developer'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Developer',
        errorMessage: 'Help article not found'
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Developer',
//         errorMessage: 'Page Not Found'
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     Forecast: 'It is raining',
    //     Location: 'Philadelphia',
    //     Address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     },{
//         name:'Sara',
//         age: 24
//     }])
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About</h1>')
// })



