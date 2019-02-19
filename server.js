const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

// TODO: Add in handlebars and create the template for loding in an entry from the bestiary.

// TODO: Add in spell finding

const PORT = 3000;

let baseURL = "http://dnd5eapi.co/api/"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create base template for the monsters, maybe do a manual sort for the different types or possibly just print it out as a table of names.
// Allow the user to either click on a name/card to flip it and grab the info for it, or they can do a search for a monster and see a modal displayed card with that monster specifically.


app.get('/bestiary', function (req, res) {
    res.sendFile(path.join(__dirname, 'bestiaryPage.html'));
});



app.get('/api/bestiary', function (req, res) {
    let queryURL = baseURL + 'monsters';

    axios({
        method: 'get',
        url: queryURL
    }).then(function(response){
        res.json(response.data);
    });

})

app.get('/api/bestiary/:monster', function (req, res) {
    var monster = req.params.monster;
    console.log(monster);
    let queryURL = baseURL + 'monsters/?name=' + monster;
    console.log(queryURL);
    axios({
        method: 'get',
        url: queryURL,
    }).then(function (data) {
        if (data.data.count === 0) {
            res.send("I'm sorry, we couldn't find anything called " + monster + " in the SRD");
            return false;
        };
        // This is the array of objects of creatures returned by the search
        console.log(data.data);

        for (var i = 0; i < data.data.results.length; i++) {
            console.log('Hey, I exist')
            console.log(data.data.results[i].name)
            axios({
                method: 'get',
                url: data.data.results[i].url
            }).then(function (response) {
                console.log(response.data);
                res.json(response.data);
            })
            console.log('=============================')
        };

    });

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./landingPage.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});