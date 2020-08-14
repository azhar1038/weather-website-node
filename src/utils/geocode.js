const request = require('request')

const geocode = (address, callback)=>{
    const latLangUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+
    ".json?access_token=pk.eyJ1IjoibWRhemhhcnVkZGluIiwiYSI6ImNrZHNtbmk4ODBrZGoyeW83OWg1cndqY2QifQ.YepMJnsRJTtksG6PJRplHw&limit=1"

    request({uri: latLangUrl, json:true}, (error, {body}={})=>{
        if(error){
            callback("Cannot connect to location api", undefined)
        }else if(body.message){
            callback("Location not found", undefined)
        }else if(body.features.length == 0){
            callback("Location not found", undefined)
        }else{
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode