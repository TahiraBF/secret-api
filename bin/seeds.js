const mongoose     = require('mongoose');
const User         = require('../models/user');
const Secret         = require('../models/secret');
const Picture         = require('../models/picture');

mongoose.connect('mongodb://localhost/secret-place');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;


var salt     = bcrypt.genSaltSync(bcryptSalt);


const users = [
  {
  username      : "Loop@fruit.com",
  password      : bcrypt.hashSync("123", salt),
  name          : "Fruit",
  travellerType : "Nomad",
  description   : "I have been travelling from longer than I could walk.",
  profilePic    : null,
  isDisclaimer  : true,
  role          : 'User'

},
{
username      : "p@p.com",
password      : bcrypt.hashSync("123", salt),
name          : "Prissy",
travellerType : "Lujo",
description   : "I never go anywhere untattended by a hoard of helpers. But i can keep a secret",
profilePic    : null,
isDisclaimer  : true,
role          : 'Admin'

},
{
username      : "dd@fruit.com",
password      : bcrypt.hashSync("abc", salt),
name          : "Dave",
travellerType : "Budget",
description   : "I travelled across asia with nothing more than $4 in my pocket and flip-flops.",
profilePic    : null,
isDisclaimer  : true,
role          : 'User'

},
];

const secrets = [
  {
  where: "Chefchaouen, Morocco",
  location: "Medina",
  what: "Hotel Dar Dadicilef",
  description: "This is the best place to stay if you're going to spend a few days in Chefchaouen. Free breakfast along with one of the best views of the city from their terrace.",
  tips: "This place is very hard to find online. If you can get access to their phone number, call them directly to book. Also, their address isn't on google maps so you'll need to call and ask for directions if it's your first time.",
  when: "September 2016",
  user: "58bed89570ba4033c16c5eef",
  image: " "
},

{
where: "Getaria, Spain",
location: "Monte de San Anton",
what: "Viewpoint",
description: "This short little hike up the San Anton mountain will without a doubt be worth the amazing views you get at the end. Located right next to the port, the top of the mountain gets you a 360 view surrounded by the sea and the town of Getaria. While the town of Getaria does get a good bit of tourists in peak summer time (while we were there), we didn't come across any tourists on this hike, just a few friendly locals as it's a good spot to bring dogs.",
tips: "The path starts off as a road but eventually turns to gravel and dirt, so make sure you bring comfortable shoes!",
when: "July 2016",
user: "58bed89570ba4033c16c5ef1",
image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiUqYyBpcnSAhWKfxoKHRN3A0QQjRwIBw&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Ftropical-beach.html&psig=AFQjCNHLNlcdNKopITf0oG7Swxdf_pMa2Q&ust=1489144314844459"
},

{
where: "New Orleans, USA",
location: "Port of Call",
what: "Restaurant",
description: "Amazing little restaurant located in New Orleans, Louisiana. They have the best hamburger and baked potato in the city. While you can find hurricanes just about anywhere, only Port of Call has the monsoon...make sure you get one!",
tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
when: "December 2016",
user: "58bed89570ba4033c16c5ef0",
image: " "
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



User.create(users, (err, docs)=> {
  if (err){
    throw(err);}

    docs.forEach( (user)=>{

      console.log(user.username);
    });
    mongoose.connection.close();
  });

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
