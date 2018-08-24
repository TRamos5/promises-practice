let express = require('express');
let app = express();
var prompt = require('prompt-promise');



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
    database: 'music_db',
    user: 'postgres'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);


// Create the database instance:
const db = pgp(config);


var res = [];

// prompt('Album Name? ')
// .then(function name(val) {
//   res.push(val);
//   return prompt('Album Year? ');
// })
// .then(function year(val) {
//   res.push(val);
//   return prompt('Artist ID? ');
// })
// .then(function id(val){
//     res.push(val);
//     console.log(res);
//     prompt.done();
//     var query = (`insert into album\
//     values (default, '${res[0]}', '${res[1]}', ${res[2]})`);
//     db.result(query)
//         .then(function(result){
//         console.log(result);
//         });
// })
// .catch(function rejected(err) {
//   console.log('error:', err.stack);
//   prompt.finish();
// });

// var art = [];
// prompt('Artist name? ')
// .then(function artistname(val) {
//     art.push(val);
//     prompt.done();
//     var query = (`insert into artist\
//     values (default, '${art[0]}')`);
//     db.result(query)
//         .then(function(result){
//         console.log(result);
//         });
// })
// .catch(function rejected(err) {
//     console.log('error:', err.stack);
//     prompt.finish();
// });

var track = [];
prompt('Track name?')
.then(function trackname(val){
    track.push(val);
    return prompt('Track duration? ');
})
.then(function trackduration(val){
    track.push(val);
    return prompt('Album ID? ');
})
.then(function albumid(val){
    track.push(val);
    console.log(track);
    prompt.done();
    var query = (`insert into track\
    values (default, '${track[0]}', '${track[1]}', ${track[2]})`);
    db.result(query)
        .then(function(result){
        console.log(result);
        });
})
.catch(function rejected(err){
    console.log('error: ', err.stack);
    prompt.finish();
});

// db.query('select * from music_db')
//     .then(function(result){
//         results.forEach(function (r){
//             console.log(r.id, )
//         })
//     })






var server = app.listen(4000);

server.on('close', function(){
    pgp.end();
});



//make it print "create tradck with id: """"