const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3334

// Paths for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather",
        name: 'Md Azharuddin'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page",
        name: 'Md Azharuddin'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: "Enter the location in input field in home page and click search. Thats all!",
        title: "Help Page",
        name: 'Md Azharuddin'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error: "Please provide an address"})
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) return res.send({error})
        forecast(latitude, longitude, (error, {weather, icon, temperature, feelslike}={})=>{
            if(error) return res.send({error})
            res.send({
                location,
                weather,
                icon,
                temperature,
                feelslike,
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        message: "This help article not found!",
        title: "404",
        name: 'Md Azharuddin'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        message: "Page not found!",
        title: "404",
        name: 'Md Azharuddin'
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port "+port)
})