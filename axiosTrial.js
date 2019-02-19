const axios = require('axios');

axios({
    method: 'get',
    url: 'http://dnd5eapi.co/api/monsters/?name=Adult Black Dragon'
}).then( function (data) {
    if (!data) {
        return false;
    };
    console.log(data.data);
    console.log(data.data.results.length);

    for (var i = 0; i < data.data.results.length; i++){
        console.log('Hey, I exist')
        console.log(data.data.results[i].name)
        axios({
            method: 'get',
            url: data.data.results[i].url
        }).then(function(response){
            console.log(response)
        })
        console.log('=============================')
    };

});