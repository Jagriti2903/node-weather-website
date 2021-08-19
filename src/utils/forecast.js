const request = require('request')

const forecast = (latitude , longitude , callback) => {

    url = 'http://api.weatherstack.com/current?access_key=d84c8202785e66674308cf874d98ef8f&query='+latitude+','+longitude

    request( {url: url , json: true}, (error,response)=>{

        if (error) {

            callback('Unable to connect to weather service',undefined)

        } else if (response.body.error) {

            callback('Unable to find location',undefined)

        } else {

            callback(undefined,response.body.current.weather_descriptions[0] +". Temperature in degree is " + response.body.current.temperature +". The humidity is "+response.body.current.humidity+"%")


        }


    })


}

module.exports = forecast