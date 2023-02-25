//****************************************************************************************************** */
//************************DO NOT HOST SCRIPT BECAUSE API WILL BE EXPOSED!!!!!!!!!!!*************
//**********************//**********************//**********************//**********************//**********************

//require no longer works - probably a node function only
// const {apiKey} = require('../config')
const button = document.querySelector('button');

//ask airen how to hide this - don't push to github before this is 
//handled


const getWeather = async () => {
    try {
        const config = { params: {key: API_KEY, q:'New York', aqi:'no'}} 
        const res = await axios.get('http://api.weatherapi.com/v1/current.json', config);

        console.log(res.data)
    } catch (e) {
        console.log('Failed', e)
    }
}

button.addEventListener('click', getWeather)