const express = require('express')
const ejsMate = require('ejs-mate')
const {apiKey} = require('./config')
const axios = require('axios')
const path = require('path')

//defining the server
const app = express();

//testing config
// console.log(apiKey)
app.use(express.static(path.join(__dirname, '/scripts')))

//defining the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
//setting view location
app.set('views', path.join(__dirname,'/views'))


//middleware
app.use(express.urlencoded({extended:true}))


app.use((req,res,next) => {
    res.locals.data = {};
    next();
})

//API functions
const getWeather = async (location) => {
    try {
        const config = {params: {key:apiKey,  q:location, aqi:'no'}}
        const res = await axios.get('http://api.weatherapi.com/v1/current.json', config);
        return res.data
    } catch (e) {
        console.log('Failed' , e)
    }
};

//initializing the server
const port = 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

//home route
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/search', async (req, res) => {
    const {location} = req.query
    const weatherData = await getWeather(location);
    // console.log(weatherData);
    const {
        current: {
            temp_f,
            condition:{
                text,
                icon
            },
            humidity,
            precip_in,
            cloud
        }
    } = weatherData;
    const data = {location, temp_f, text, icon, humidity, precip_in, cloud}
    res.render('home', {data})
})

