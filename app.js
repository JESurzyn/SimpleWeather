const express = require('express')
const ejsMate = require('ejs-mate')
const {apiKey, sessSecret} = require('./config')
const axios = require('axios')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');

//defining the server
const app = express();

const sessionOptions = {secret: sessSecret, resave:false, saveUninitialized:false}
app.use(session(sessionOptions));
app.use(flash());


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
    res.locals.notFound = req.flash('notFound');
    // res.locals.genError = req.flash('genError');
    next();
})

//API functions
const getWeather = async (location) => {
    // try {
        const config = {params: {key:apiKey,  q:location, aqi:'no'}}
        const res = await axios.get('http://api.weatherapi.com/v1/current.json', config);
        return res.data
    // } catch (e) {
        // console.log('Failed' , e)
    // }
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

app.get('/search', async (req, res, next) => {
    try {
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
    } catch (e) {
        // console.log(e)
        if(e.response.status === 400) {
            req.flash('notFound', "Something went wrong, maybe the location you entered doesn't exist?");
            res.redirect('/')
        } else {
            next(e)
        }
 
    }
})

app.use((err, req, res, next) => {
    const { status = 500, message='Something went Wrong'} = err;
    console.log(status)
    console.log(err.response.status)
    res.status(status).send(message)
})