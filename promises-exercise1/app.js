let express = require('express');
let app = express();
var rp = require('request-promise');
var fs = require('fs');
var axios = require('axios');

// Bluebird is the best promise library available today,
// and is the one recommended here:
const promise = require('bluebird');


// pg-promise initialization options:
const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise, 
};

// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'veronica2',
    user: 'postgres'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);


// Create the database instance:
const db = pgp(config);

var url = [ 'https://en.wikipedia.org/wiki/Futures_and_promises', 'https://en.wikipedia.org/wiki/Continuation-passing_style', 'https://en.wikipedia.org/wiki/JavaScript', 'https://en.wikipedia.org/wiki/Node.js', 'https://en.wikipedia.org/wiki/Google_Chrome' ];

//web scraping
Promise.all(['https://en.wikipedia.org/wiki/Futures_and_promises', 'https://en.wikipedia.org/wiki/Continuation-passing_style', 'https://en.wikipedia.org/wiki/JavaScript', 'https://en.wikipedia.org/wiki/Node.js', 'https://en.wikipedia.org/wiki/Google_Chrome'])
.then(function(responses){
    responses.forEach(function(e){
        rp(e)
        .then(function(htmlString){
            console.log(htmlString);
        })
        .catch(function(err){
            console.log(err);
        })
    })
});


//chaining
function saveWebPage(url, filename){
    axios.get(url)
    .then(function(htmlString){
        fs.writeFile(filename, htmlString.data, 'utf8', function(err){
            if (err) throw err;
            console.log('The file has been saved');
        });
    })
    .catch(function(err){
        console.log(err);
    })
};

saveWebPage(url[1], 'test.html')

//Cat 2 Files
function cat(file1, file2, outputFile){
    var p = new Promise(function(resolve, reject){
        fs.readFile(file1, 'utf8', function(err, data){
            resolve(data);
        })
    })
    var c = new Promise(function(resolve, reject){
        fs.readFile(file2, 'utf8', function(err, data2){
            resolve(data2);
        })
    })
    Promise.all([p, c]).then(function(add){
        fs.writeFile(outputFile, add[0] + add[1], function(err){
            if (err) throw (err);
            console.log('added');
        })
    })
}
cat('test.txt', 'test2.txt', 'output.txt');


// //Resolve, Reject
function addNumbers(x, y){
    var promise = new Promise(function(resolve, reject){
        try {
            if(Number.isInteger(x) && Number.isInteger(y)){
                resolve(x + y);
            }
            else{
                reject('error');
            }
         
        } catch(error) {

        }
    })
    return promise;
}

addNumbers(4, 12).then(function(result){
    console.log(result);
}).catch(function(error){
    console.log(error);
});


var server = app.listen(4000);

server.on('close', function(){
    pgp.end();
});