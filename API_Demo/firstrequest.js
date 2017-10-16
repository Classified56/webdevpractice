var request = require('request');

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(err, res, body){
    // if(err){
    //     console.log('Something went wrong! \n'+err);
    // }else if(res.statusCode == 200){
    //     console.log('It worked');
    //     console.log(body);
    // }else{
    //     console.log('ummm....');
    //     console.log(body);
    // }
    if(!err && res.statusCode == 200){
        //When an API returns a JSON response, it is filtered as a string so we need to turn it back into an object
        var data = JSON.parse(body);
        console.log('Sunset in Hawaii is at: '+data['query']['results']['channel']['astronomy']['sunset']);
    }
});