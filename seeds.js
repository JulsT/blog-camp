var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require('./models/comment');

var data = [
    { name: 'Harbour Island, Bahamas',
      image: 'https://media.cntraveler.com/photos/58acb50c29676a553e60cecc/master/w_420,c_limit/harbour-island-bahamas-GettyImages-548295287.jpg',
      description:'Located on the western shore of the 75-square-mile island, the whole stretch of this 5.5 mile-long beach is public property, making it easy to stroll from hotel to hotel regardless of where you book an overnight. All in one afternoon, you can grab lunch at an ocean-side restaurant, stumble into a volleyball game with locals, take Jet Skis out further down the beach, and top it off with some snorkeling in Cemetery Reef, known for its rocky formations prime for sea life habitat.'
    },
    {
        name: 'Horseshoe Bay, Bermuda',
        image:'https://media.cntraveler.com/photos/5697f66978d099fc122482c6/master/w_420,c_limit/horseshoe-bay-bermuda-getty.jpg',
      description:'Located on the western shore of the 75-square-mile island, the whole stretch of this 5.5 mile-long beach is public property, making it easy to stroll from hotel to hotel regardless of where you book an overnight. All in one afternoon, you can grab lunch at an ocean-side restaurant, stumble into a volleyball game with locals, take Jet Skis out further down the beach, and top it off with some snorkeling in Cemetery Reef, known for its rocky formations prime for sea life habitat.'
    },
    {
        name: 'Seven Mile Beach, Grand Cayman, Cayman Islands',
        image: 'https://media.cntraveler.com/photos/59ef91dd8d4f736d51415c2e/master/w_420,c_limit/7MileBeach-2013-HiRes.jpg',
      description:'Located on the western shore of the 75-square-mile island, the whole stretch of this 5.5 mile-long beach is public property, making it easy to stroll from hotel to hotel regardless of where you book an overnight. All in one afternoon, you can grab lunch at an ocean-side restaurant, stumble into a volleyball game with locals, take Jet Skis out further down the beach, and top it off with some snorkeling in Cemetery Reef, known for its rocky formations prime for sea life habitat.'
    }
    ];

function seedDB(){
    Camp.deleteMany({}, function(err){
    if(err){
        console.log(err);
    }
    console.log('removed camps');
    data.map(seed =>{
    Camp.create(seed, function(err,camp){
    if (err) {
        console.log(err)
    } else {
        console.log('added camp');
        Comment.create(
            {
            text: 'This place is great!!!!',
            author: 'Homer'
        }, function(err,comment){
            if (err) {
                console.log(err);
            } else {
                camp.comments.push(comment);
                camp.save();
                console.log('Created new comment');
            }
        })
    }
    })
})
});

}

module.exports = seedDB;