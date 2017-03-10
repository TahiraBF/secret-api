const mongoose     = require('mongoose');
const User         = require('../models/user');
const Secret         = require('../models/secret');
const Picture         = require('../models/picture');

mongoose.connect('mongodb://localhost/secret-place');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;


var salt     = bcrypt.genSaltSync(bcryptSalt);


// const users = [
//     {
//     username      : "Loop@fruit.com",
//     password      : bcrypt.hashSync("123", salt),
//     name          : "Fruit",
//     travellerType : "Nomad",
//     description   : "I have been travelling from longer than I could walk.",
//     profilePic    : null,
//     isDisclaimer  : true,
//     role          : 'User'
//
//   },
//   {
//   username      : "p@p.com",
//   password      : bcrypt.hashSync("123", salt),
//   name          : "Prissy",
//   travellerType : "Lujo",
//   description   : "I never go anywhere untattended by a hoard of helpers. But i can keep a secret",
//   profilePic    : null,
//   isDisclaimer  : true,
//   role          : 'Admin'
//
//   },
//   {
//   username      : "dd@fruit.com",
//   password      : bcrypt.hashSync("abc", salt),
//   name          : "Dave",
//   travellerType : "Budget",
//   description   : "I travelled across asia with nothing more than $4 in my pocket and flip-flops.",
//   profilePic    : "https://s-media-cache-ak0.pinimg.com/736x/20/3d/59/203d59ade6a9d134cbe8ec8d045034ff.jpg",
//   isDisclaimer  : true,
//   role          : 'User'
//
//   },
//   {
//   username      : "tt@tee.com",
//   password      : bcrypt.hashSync("123", salt),
//   name          : "Tahira",
//   travellerType : "Budget",
//   description   : "All travel is good travel.",
//   profilePic    : null,
//   isDisclaimer  : true,
//   role          : 'User'
//
//   },
// ];

const secrets = [
  {
  where: "Chefchaouen, Morocco",
  location: "Medina",
  what: "Hotel Dar Dadicilef",
  description: "This is the best place to stay if you're going to spend a few days in Chefchaouen. Free breakfast along with one of the best views of the city from their terrace.",
  tips: "This place is very hard to find online. If you can get access to their phone number, call them directly to book. Also, their address isn't on google maps so you'll need to call and ask for directions if it's your first time.",
  when: "September 2016",
  user: "58c2e8517b531c08d4eb2f60",
  image: "https://static.pexels.com/photos/238622/pexels-photo-238622.jpeg"
  },

  {
  where: "Getaria, Spain",
  location: "Monte de San Anton",
  what: "Viewpoint",
  description: "This short little hike up the San Anton mountain will without a doubt be worth the amazing views you get at the end. Located right next to the port, the top of the mountain gets you a 360 view surrounded by the sea and the town of Getaria. While the town of Getaria does get a good bit of tourists in peak summer time (while we were there), we didn't come across any tourists on this hike, just a few friendly locals as it's a good spot to bring dogs.",
  tips: "The path starts off as a road but eventually turns to gravel and dirt, so make sure you bring comfortable shoes!",
  when: "July 2016",
  user: "58c2e8517b531c08d4eb2f5f",
  image: "https://static.pexels.com/photos/227417/pexels-photo-227417.jpeg"
  },

  {
  where: "New Orleans, USA",
  location: "Port of Call",
  what: "Restaurant",
  description: "Amazing little restaurant located in New Orleans, Louisiana. They have the best hamburger and baked potato in the city. While you can find hurricanes just about anywhere, only Port of Call has the monsoon...make sure you get one!",
  tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
  when: "December 2016",
  user: "58c2e8517b531c08d4eb2f60",
  image: "http://www.brazilcarnival.com.br/upload_images/Example_Float_Brazil_Carnival_by_Alexandre_Vidal.jpg"
  },
  {
  where: "Bogota, Colombia",
  location: "Chicó norte",
  what: "Hotel Click-Clack",
  description: "Awesome. A really cool hotel. A giant plant wall greets as you walk in. The cocktail bar in the basement has innovative literary-themed cocktails. The place to be and be seen.",
  tips: "Don't skip the free breakfast.",
  when: "January 2016",
  user: "58c2e8517b531c08d4eb2f5f",
  image: "https://exp.cdn-hotels.com/hotels/7000000/6370000/6361800/6361784/6361784_112_z.jpg"
  },

  {
  where: "Montevideo, Uruguay",
  location: "",
  what: "View",
  description: "Its worth while hiring a scooter when you arrive here. They are easily available from the beach. Take the long open road out following the coast-line north of Montevideo to view the Darwin relics and feel part of the motorcycle-diaries.",
  tips: "Mosquito repellant is a must for even a short trip to the beach.",
  when: "December 2010",
  user: "58c2e8517b531c08d4eb2f5d",
  image: "https://static.pexels.com/photos/9537/sea-beach-sand-sun.jpg"
  },

  {
  where: "Chiang Mai, Thailand",
  location: "Chiang Mai",
  what: "Acitvity",
  description: "Massage Center by Ex-Prisoners is a massage parlour where all the massueses are ex-cons. Its really fun and they do a great job. ",
  tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
  when: "December 2016",
  user: "58c2e8517b531c08d4eb2f5d",
  image: "http://www.chiangmailocator.com/design/photosbiz/chiang-mai-khunka-massage-145.jpg"
  },
  {
  where: "Koh Lanta, Thailand",
  location: "Koh Lanta",
  what: "Accommodation",
  description: "I found the KLazy House by accident when I arrived on Koh Lanta with no place to stay. You take a tuc-tuc from the boat and he'll have to drop you off at the top of a dirt track about 15min drive from the boat. Trust me you need to walk down the path. The first accommodation you'll see if the Klazy House on the right. Its unmissable with all the hand crafted wood features from reception desk, bar and huts. There's a shared hut and private huts but all super cheap. Ko, the owner, also has chicken running around and it super welcoming. The huts are about 5mins from the beach. ",
  tips: "The tuc-tuc ride should be no more than 20baht. Hire a scooter to see the rest of the island. Take a padlock for valuables as security is non-existent.",
  when: "February 2013",
  user: "58c2e8517b531c08d4eb2f60",
  image: "http://www.chiangmailocator.com/design/photosbiz/chiang-mai-khunka-massage-145.jpg"
},
{
where: "Thailand",
location: "Bangkok",
what: "Eat",
description: "Coconut ice-cream that is quite easily the best thing I've put in my mouth. Ever! If you take the Golden Temple tour, outside the gates when you exit there is a little cafe which sells smooth coconut ice-cream with toppings. My favorite is topped with condensed milk and sweet red beans.",
when: "February 2013",
user: "58c2e8517b531c08d4eb2f60",
image: "http://images.budgettravel.com/thai-coconut-ice-cream-462015-175519_panoramic.jpeg"
}
];


// const pictures = [
//   {
//     pic_path: '/uploads/1489009898799.JPG',
//     pic_name: "luft",
//   	user: "58bed614f23e9c706c604fbc",
//     profile: true
//   }
// ];


//
// User.create(users, (err, docs)=> {
//   if (err){
//     throw(err);}
//
//     docs.forEach( (user)=>{
//
//       console.log(user.username);
//     });
//     mongoose.connection.close();
//   });

Secret.create(secrets, (err, posts)=> {
  if (err){
    throw(err);
  }
    posts.forEach( (secret)=>{
      console.log(secret.where);
    });
    mongoose.connection.close();
});

// Picture.create(pictures, (err, pics)=> {
//   if (err){
//     throw(err);
//   }
//     pics.forEach( (pic)=>{
//       console.log(pic.pic_name);
//     });
//     mongoose.connection.close();
// });
