const request = require('request')

const giocode = (address,callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoibmlrdWwxMjEyIiwiYSI6ImNrZnhpMDJjejAwcjcyc203eW5vZm92NWkifQ.X-xX_tkLIy6f7dtsDfn_Ng'

    request({ url : url , json:true},(error,response) => {
        if(error) {
             callback('Unable to connect to weather service!',undefined)    
        }
        else if(response.body.features.length == 0) {
           
            callback('Unable to find location',undefined)
        }
        else {
            callback( undefined, { 
                logtitut  : response.body.features[0].center[0],
                laptitute : response.body.features[0].center[1],
                location  : response.body.features[0].place_name
            })
        }
    })
}
// giocode('india',(error,data) => {
//     console.log('ERROR' , error)
//     console.log('data' , data)
// }) 

module.exports = giocode
