console.log("This is the client Side javascript file")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')
const weatherIcon = document.getElementById('weather-icon')

forecast.textContent=''

weatherForm.addEventListener('submit', (e)=>{
    forecast.textContent='Fetching weather. Please wait...'
    e.preventDefault()
    const location = search.value
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error) return forecast.textContent = data.error
            weatherIcon.innerHTML = "<img src=\""+data.icon+"\">"
            forecast.innerHTML = "Matching location: "+data.location+"<br><br>Weather: "+data.weather+
            "<br>Temperature: "+data.temperature+" &deg;C<br>Feels like: "+data.feelslike+"  &deg;C"
        })
    })
})