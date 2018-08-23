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


// Promise.all(['https://en.wikipedia.org/wiki/Futures_and_promises', 'https://en.wikipedia.org/wiki/Continuation-passing_style', 'https://en.wikipedia.org/wiki/JavaScript', 'https://en.wikipedia.org/wiki/Node.js', 'https://en.wikipedia.org/wiki/Google_Chrome'])
// .then(function(responses){
//     responses.forEach(function(e){
//         rp(e)
//         .then(function(htmlString){
//             console.log(htmlString);
//         })
//         .catch(function(err){
//             console.log(err);
//         })
//     })
// });

// function saveWebPage(url, filename){
//     axios.get(url)
//     .then(function(htmlString){
//         fs.writeFile(filename, htmlString.data, 'utf8', function(err){
//             if (err) throw err;
//             console.log('The file has been saved');
//         });
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// };

// saveWebPage(url[1], 'test.html')

var combinedFile;

let file1 = 'test2.txt';
let file2 = 'test.txt';
let outputFile = "output.txt"

function cat(file1, file2, outputFile){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            try{
            resolve([file1, file2, outputFile]);
            }
            catch{
                reject('error');
            }
        })

    })
    .then(function(data){
        // console.log(data[0]);
        fs.readFile(data[0], 'utf8', function(err, d){
            if (err) throw err;
            console.log('Read file 1!');
            combinedFile = d;
            console.log(combinedFile);
            return data;
        })

        
    })
    .then(function(){
        console.log(data[1]);
        // fs.readFile(data[1], 'utf8', function(err, d){
        //     if (err) throw err;
        //     console.log('Read file 2!');
        //     combinedFile += d;
        //     console.log(combinedFile);
        // })

        // return data;
    })
    .then(function(data){

        // console.log("testing");
        // fs.writeFile(combinedFile, data[2], 'utf8', function(err){
        //     if (err) throw err;
        //     console.log('Made file3!');
        // })
    })
    .catch(function(err){
        console.log(err);
    })
}

cat(file1, file2, outputFile);

//cat('https://en.wikipedia.org/wiki/Continuation-passing_style', 'https://en.wikipedia.org/wiki/Futures_and_promises', 'test2.txt')






var server = app.listen(4000);

server.on('close', function(){
    pgp.end();
});