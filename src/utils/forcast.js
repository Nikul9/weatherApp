const request = require('request')

const forcast = (logtitut,laptitut,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c39242b816735cdc73ce51439b406789&query= ' + logtitut + ',' + laptitut + '&units=f'
    
    request({url : url, json : true}, (error,response) => {
        if(error) {
            throw "error";
            // callback('Unable to connect to weather service!' ,undefined)
      }
      else if(response.body.error) {
            throw "error"; 
        // callback('Unable to find location' , undefined)
      }
      else {
          callback( undefined, 'weather_descriptions = ' +response.body.current.weather_descriptions[0]   
          + ' , Todays temprature = ' + response.body.current.temperature + ' , weather_code = ' 
          + response.body.current.weather_code )
      }
    }) 
} 

  module.exports = forcast