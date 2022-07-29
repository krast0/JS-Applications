function attachEvents() {
   
    let symbols = {
    'Sunny': '&#x2600',
    'Partly sunny': '&#x26C5',
    'Overcast': '&#x2601',
    'Rain': '&#x2614',
    'Degrees': '&#176',
    }
    //symbols

    let submitBtn = document.getElementById('submit')
    let inputField = document.getElementById('location')
    let url = `http://localhost:3030/jsonstore/forecaster/locations`
    let divCurrent = document.getElementById('current')
    let divForecast = document.getElementById('forecast')
    let upcomingForecast = document.getElementById('upcoming')
    submitBtn.addEventListener('click',getWeather)

    function getWeather(e) {
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let newData = Object.assign(data)
            let found = newData.find(({ name }) => name === inputField.value);
            currentTime()
            threeDayForecast()
            divForecast.style.display = 'block'
            function currentTime() {
                let urlCode = `http://localhost:3030/jsonstore/forecaster/today/${found.code}`
                fetch(urlCode)
                .then(response => response.json())
                .then(data => {

                    divCurrent.innerHTML = `
                    <div class="label">Current conditions</div>
                    <div class="forecasts">
                    <span class="condition symbol">${symbols[data.forecast.condition]}</span>
                    <span class="condiniton">
                    <span class="forecast-data">${data.name}</span>
                    <span class="forecast-data">${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}</span>
                    <span class="forecast-data">${data.forecast.condition}</span>
                    </span>
                    </div>
                    </div>
                    `
                })
                .catch(
                    divCurrent.innerHTML = `
                    <div class="label">Error</div>
                    `
                )
            }
            function threeDayForecast() {
                let urlCode = `http://localhost:3030/jsonstore/forecaster/upcoming/${found.code}`
                fetch(urlCode)
                .then(response => response.json())
                .then(data =>{
                    let newData = Object.assign(data)
                    upcomingForecast.innerHTML = '<div class="label">Three-day forecast</div>'
                    let divClass = document.createElement('div')

                    divClass.classList = 'forecast-info'
                
                    for (const el of newData.forecast) {
                        divClass.innerHTML += `
                        <span class="upcoming">
                        <span class="symbol">${symbols[el.condition]}</span>
                        <span class="forecast-data">${el.low}${symbols.Degrees}/${el.high}${symbols.Degrees}</span>
                        <span class="forecast-data">${el.condition}</span>
                        </span>
                        `
                    }
                    upcomingForecast.appendChild(divClass)
                })               
            }
        })
        .catch(
            divCurrent.innerHTML = `
            <div class="label">Error</div>
            `
        )
    }

}

attachEvents();