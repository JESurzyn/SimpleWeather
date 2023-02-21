const express = require('express')
const ejsMate = require('ejs-mate')

//defining the server
const app = express();

//defining the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
//setting view location
app.set('views', 'views/')

//initializing the server
const port = 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

//home route
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/weather', (req, res) => {
    res.render('weather')
})

app.post('/weather', (req, res) => {
    res.redirect('/weather')
})