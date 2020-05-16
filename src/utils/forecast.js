const request = require('request')

const forecast = (ad, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=26818e47b16be44173b92d1e8fe3803f&query='+ad
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to process your request', undefined)
        }else{
            if(response.body.success==false){
                callback('Enter a valid place', undefined)
            }else{
                callback(
                    undefined,
                    {
                        location: response.body.request.query,
                        temp: response.body.current.temperature,
                        type:response.body.current.weather_descriptions[0]
                    }
                )
            }
        }
    })
}

module.exports = forecast