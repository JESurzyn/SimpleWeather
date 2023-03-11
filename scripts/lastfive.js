// project plan 
// - create a function that runs on button click 
//     - actually probably only want it to run if the api returns anything
// - function will
//     - take input from search bar 
//     - set the input to local Storage
//         localStorage.setItem(loc1, input)
//     - there's a loop -> or an if
//         - if less 5 in local storage keep adding
//         - if 5 or more, kick out the last entry

// const { default: axios } = require("axios");

// - create another function or code that reads what's in local storage 
//     - display the results as buttons or hrefs and (maybe with the icon as well and the date)
//     - make the buttons clickable to make a request from api
//won't load from file

const weatherSearch = document.querySelector('#weatherSearch');
const locationInput = document.getElementById('location')
const search = document.getElementById('search')
const mainContainer = document.getElementById('mainContainer')

//adding to local storage
const addLocation = async () => {
        const locVal = locationInput.value
        const config = {params: {location:locVal }}
        const res = await axios.get('http://localhost:3000/search', config);
        // console.log(res.status)
        let key = 0
        if (localStorage.length > 0) {
            for (let i = 1; i< localStorage.length+1; i++) {
                if (locVal === localStorage.getItem(i)) {
                    return
                }
            };
            if (localStorage.length < 5) {
                key = localStorage.length + 1
                localStorage.setItem(key,locVal)
            } else {
                //removes earliest item
                localStorage.removeItem(1)
                //relabel keys
                let keys = Object.keys(localStorage);
                let tempObj = {}
                for (let key of keys) {
                    tempObj[key-1] = localStorage.getItem(key)
                }
                localStorage.clear();
                keys = Object.keys(tempObj);
                let tempVal = ''
                for (let key of keys) {
                    tempVal = tempObj[key];
                    localStorage.setItem(key,tempVal)
                }
                localStorage.setItem(5,locVal);
            };    
        } else {
            key = localStorage.length + 1
            localStorage.setItem(key,locVal);
        }
}



const makePreviousSearches = (x) => {
    const previousSearches = document.createElement('div')
    previousSearches.setAttribute('class', 'container mt-5 p-4')
    previousSearches.setAttribute('id', 'previousSearches')
    x.insertAdjacentElement('afterend', previousSearches)
    
    const h6 = document.createElement('h6')
    h6.innerText = 'Previous Searches'
    previousSearches.append(h6)

    const subDiv = document.createElement('div');
    subDiv.setAttribute('class', 'row row-cols-2 row-cols-lg-5 g-2 g-lg-3')
    h6.insertAdjacentElement('afterend', subDiv)

    for (let i=1; i < localStorage.length+1; i++) {
        let a = document.createElement('div')
        a.setAttribute('class', 'col')
        a.setAttribute('id', i)
        let b = document.createElement('a')
        b.setAttribute('href', `search?location=${localStorage.getItem(i)}`)
        b.innerText = localStorage.getItem(i)
        a.insertAdjacentElement('afterbegin', b)
        
        subDiv.insertAdjacentElement('beforeend', a)
    }
}


if (localStorage.length > 0) {
    if(document.getElementById('currentWeather')) {
        const currentWeather = document.getElementById('currentWeather')
        makePreviousSearches(currentWeather)
    } else {
        makePreviousSearches(search)
    }
}


//fix the clear history button
if (document.getElementById('previousSearches')) {
    const clearButton = document.createElement('button');
    clearButton.setAttribute('class', 'btn btn-secondary mt-3 btn-sm')
    clearButton.innerText = "Clear Searches"
    clearButton.onclick = function clearHistory() {
        localStorage.clear();
        location.reload()
    }
    previousSearches.insertAdjacentElement('beforeend', clearButton)
}

weatherSearch.addEventListener('click', addLocation)
//if previousSearches exists then next under PreviousSearches
//else nest under currentWeather

            // <div class="container border mt-5 p-4" id="previousSearches">
            //     <h6>Previous Searches</h6>
            //     <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            //         <div class="col">
            //           <div class="p-3 border text-center">Row column</div>
            //         </div>
            //         <div class="col">
            //           <div class="p-3 border text-center">Row column</div>
            //         </div>
            //         <div class="col">
            //           <div class="p-3 border text-center">Row column</div>
            //         </div>
            //         <div class="col">
            //           <div class="p-3 border text-center">Row column</div>
            //         </div>
            //         <div class="col">
            //           <div class="p-3 border text-center">Row column</div>
            //         </div>
            //       </div>
            // </div>

            // <div class="container mt-5 p-4" id="previousSearches">
            //          <h6><u>Previous Searches</u></h6>
            //          <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            //              <div class="col">
            //                <a href="search?location=New York">New York</a>
            //              </div>
            //              <div class="col">
            //                 <a href="search?location=New York">New York</a>
            //               </div>
            //               <div class="col">
            //                 <a href="search?location=New York">New York</a>
            //               </div>
            //               <div class="col">
            //                 <a href="search?location=New York">New York</a>
            //               </div>
            //               <div class="col">
            //                 <a href="search?location=New York">New York</a>
            //               </div>
            //            </div>
            //      </div>