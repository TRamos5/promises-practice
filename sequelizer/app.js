let db = require('./models');

// db.album.create({name:'t', year: '1990', artist_id: '1'})
// .then(function(user){
//     console.log(user);
// });

// db.artist.create({name:'artist1'})
// .then(function(user){
//     console.log(user);
// });

db.track.create({name:'artist1', album_id: '1', duration: '242'})
.then(function(user){
    console.log(user);
});