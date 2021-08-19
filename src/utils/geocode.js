const request = require('request')

const geocode =(address, callback ) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFncml0aTI5MzIiLCJhIjoiY2tybmVlbHF1MHc5bjJ3bm96N3M0NXByNCJ9.dHz6cv5l-N57VsHjX6TsVw&limit=1'

    request({url : url , json : true}, (error,response)=>{

        if (error) {

            callback('Unable to connect to internet',undefined)
        } else if (response.body.features.length===0) {

            callback('Unable to find location. Try another location ', undefined)
        } else {

            callback(undefined , {

                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name

            })
        }

    })
}

module.exports = geocode