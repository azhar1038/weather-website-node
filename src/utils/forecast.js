const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const latLong = latitude+","+longitude;
    const weatherUrl="http://api.weatherstack.com/current?access_key=c5c7488cc9d3ea68e1e3bbec7b26da7b&query="+encodeURIComponent(latLong)

    request({uri:weatherUrl, json:true}, (error, {body}={})=>{
        if(error){
            callback("Cannot connect to weather api", undefined)
        }else if(body.error){
            callback("Weather data not found for the location", undefined)
        }else{
            const {weather_descriptions, temperature, feelslike, weather_icons} = body.current
            callback(undefined, {
                weather: weather_descriptions[0],
                icon: weather_icons[0],
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast