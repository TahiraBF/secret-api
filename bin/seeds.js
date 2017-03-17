const mongoose     = require('mongoose');
const User         = require('../models/user');
const Secret         = require('../models/secret');
const Picture         = require('../models/picture');
require("dotenv").config();


mongoose.connect(process.env.MONGODB_URI);
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;


var salt     = bcrypt.genSaltSync(bcryptSalt);


const users = [
    {
    username      : "luna@moon.com",
    password      : bcrypt.hashSync("123", salt),
    name          : "Luna",
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
  travellerType : "Luxury",
  description   : "I never go anywhere untattended by a hoard of helpers. But i can keep a secret",
  profilePic    : null,
  isDisclaimer  : true,
  role          : 'Admin'

  },
  {
  username      : "nate@fruit.com",
  password      : bcrypt.hashSync("123", salt),
  name          : "Nate",
  travellerType : "Budget",
  description   : "I travelled across asia with nothing more than $4 in my pocket and flip-flops.",
  profilePic    : "https://s-media-cache-ak0.pinimg.com/736x/20/3d/59/203d59ade6a9d134cbe8ec8d045034ff.jpg",
  isDisclaimer  : true,
  role          : 'User'

  },
  {
  username      : "tt@tee.com",
  password      : bcrypt.hashSync("123", salt),
  name          : "Tahira",
  travellerType : "Budget",
  description   : "All travel is good travel.",
  profilePic    : null,
  isDisclaimer  : true,
  role          : 'User'

  },
];

const secrets = [
  {
  title: "Hotel Dar Dadicilef",
  location: "Medina, Chefchaouen, Morocco",
  what: "A place to stay",
  description: "This is the best place to stay if you're going to spend a few days in Chefchaouen. Free breakfast along with one of the best views of the city from their terrace.",
  tips: "This place is very hard to find online. If you can get access to their phone number, call them directly to book. Also, their address isn't on google maps so you'll need to call and ask for directions if it's your first time.",
  when: "September 2016",
  user: "58cb18d6140e350011b89c2d",
  image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/39/8e/be/dar-dadicilef.jpg"
  },


{
title: "Monte de San Anton",
location: "Getaria, Spain",
what: "Viewpoint",
description: "This short little hike up the San Anton mountain will without a doubt be worth the amazing views you get at the end. Located right next to the port, the top of the mountain gets you a 360 view surrounded by the sea and the town of Getaria. While the town of Getaria does get a good bit of tourists in peak summer time (while we were there), we didn't come across any tourists on this hike, just a few friendly locals as it's a good spot to bring dogs.",
tips: "The path starts off as a road but eventually turns to gravel and dirt, so make sure you bring comfortable shoes!",
when: "July 2016",
user: "58cb18d6140e350011b89c2d",
image: "http://www.northernspain.net/wp-content/uploads/2016/06/507B-2.png"
},

{
title: "Port of Call",
location: "New Orleans, USA",
what: "A place to eat",
description: "Amazing little restaurant located in New Orleans, Louisiana. They have the best hamburger and baked potato in the city. While you can find hurricanes just about anytitle, only Port of Call has the monsoon...make sure you get one!",
tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
when: "December 2016",
user: "58cb18d6140e350011b89c2d",
image: "http://ollie.neglerio.com/wp-content/uploads/2012/02/port-of-call-new-orleans-0215.jpg"
},

{
title: "Casa de Fado",
location: "Lisbon, Portugal",
what: "Place to Eat",
description: "While I haven't seen them all, this has to be the best Fado house in Lisbon. Fado restaurants are popping up all over Lisbon, but this one has been around for a while and has a very authentic feel. Recommended to me by a friend from Lisbon, this one is strictly for locals and it's unusual to find a tourist here. Although they only had a few items on their menu, it was made up by the quality. The live Fado music is truly one of a kind here and it's a magical experience you need to see.",
tips: "This restaurant is located in a sketchier corner of Alfama so beware at night! I've never been robbed going to this restaurant but I have heard that it happens from time to time.",
when: "February 2014",
user: "58cb18d6140e350011b89c2d",
image: "https://lisbonxperiencedotcom.files.wordpress.com/2013/12/10-12-2013.png"
},

{
title: "Rezabal",
location: "San Sebastian, Spain",
what: "Place to Eat",
description: "Hidden in the mountains, this \"sideria\" is truly one of a kind. It has an amazing view from the terrace and you get incredible views to go along with your meal. If you simply want a glass of wine and enjoy the sunset, they have a great bar that overlooks their orchards. Great place to go with kids as well!",
tips: "This place is hard to reach so you can only get there by car.",
when: "June 2015",
user: "58cb18d6140e350011b89c2f",
image: "https://console.listae.com/files/2015/11/restaurante_rekondo_san_sebastian_terraza.jpg"
},

{
title: "Hombres Gin",
location: "Madrid, Spain",
what: "Place to Drink",
description: "Great little bar with the best cocktails in Madrid! They only place 80's Spanish music so be prepared for a flashback!",
tips: "Thursdays are the best night to go. Avoid Saturdays as they get super packed!",
when: "January 2017",
user: "58cb18d6140e350011b89c2f",
image: "http://thedrinknation.com/uploads/pdx%20gt.jpg"
},

{
title: "Koku Kitchen",
location: "Barcelona, Spain",
what: "Place to Eat",
description: "Nice place to eat Japanese food in Barcelona. It's a small restaurant so it gets packed easily. On Fridays and Saturdays you can expect wait but it's well worth it!",
tips: "There are two floors, the top floor is buns and the bottom floor is ramen. There are two different kitchens, however so you can only order from each floors respective kitchen. Make sure you check the menu before you sit.",
when: "March 2017",
user: "58cb18d6140e350011b89c2f",
image: "http://www.historiasdeunabstracto.com/wp-content/uploads/2014/06/miso-ramen-koku-kitchen.jpg"
},

{
title: "El Dorado Bar",
location: "San Diego, USA",
what: "Place to Drink",
description: "Cool little dive bar in the North Park neighborhood in San Diego. Great cocktails, cool music and nice atmosphere. They also have a patio area in the back so you can enjoy the terrific San Diego weather while you drink.",
tips: "Even though the bar closes at 2am, they usually do last call at 1:30am.",
when: "June 2016",
user: "58cb18d6140e350011b89c2f",
image: "http://www.eldoradobar.com/images/ElDslider04.jpg"
},

{
title: "Bodega Bay",
location: "Bodega Bay, California, USA",
what: "Activity",
description: "This outdoor picnic area sells raw oysters on the half shell so you can buy the by the sack and enjoy them outside. They are as fresh as they come since they catch the oysters right there in Bodega Bay. You can rent out the tools to shuck from the oyster farm or bring your own. They also sell alcohol but you can bring it yourself if you'd like. Wonderful place to enjoy oysters outdoors and get a great view of the bay!",
tips: "This place gets packed on Saturdays and Sundays and they have limited seating so be sure to get there by 10am or expect a wait of at least 2 hours. Everything is outdoors so not a good place to go if it's raining.",
when: "May 2015",
user: "58cb18d6140e350011b89c2f",
image: "https://unlostwanderer.files.wordpress.com/2014/01/picnic-table-in-front-of-bay-1280.jpg"
},

{
title: "DUMBO",
location: "Brooklyn, New York, USA",
what: "View",
description: "Just on the other side of Manhatten in Brooklyn, there's a little green area in Dumbo where you get a great view of the World Trade Center from across the river. It's at the base of the Brooklyn and Manhattan bridges overlooking the water.",
tips: "The neighborhood is a bit quiet so it's hard to find a place to eat or drink outside of work hours.",
when: "January 2016",
user: "58cb18d6140e350011b89c30",
image: "https://media.cntraveler.com/photos/555b6bf9560358cc3c6eadd6/master/pass/dumbo-brooklyn-promenade-cr-alamy.jpg"
},

{
title: "Dos Amigos Taco Truck",
location: "Austin, USA",
what: "Place to Eat",
description: "Some of the best tacos you'll find in Texas. They have authentic Oaxacan tacos and little else on their menu.",
tips: "It's a taco truck so the location varies every day. Check their twitter (@dosamigostacotruck) to find out title they are that day.",
when: "December 2016",
user: "58cb18d6140e350011b89c30",
image: "https://img.wonkette.com/wp-content/uploads/2016/09/tacotruck.jpg"
},

  {
  title: "Hotel Click-Clack",
  location: "Chicó norte, Bogota, Colombia",
  what: "A place to stay",
  description: "Awesome. A really cool hotel. A giant plant wall greets as you walk in. The cocktail bar in the basement has innovative literary-themed cocktails. The place to be and be seen.",
  tips: "Don't skip the free breakfast.",
  when: "January 2016",
  user: "58cb18d6140e350011b89c30",
  image: "https://exp.cdn-hotels.com/hotels/7000000/6370000/6361800/6361784/6361784_112_z.jpg"
  },

  {
  title: "Costa Monte",
  location: "Montevideo, Uruguay",
  what: "Activity",
  description: "Its worth while hiring a scooter when you arrive here. They are easily available from the beach. Take the long open road out following the coast-line north of Montevideo to view the Darwin relics and feel part of the motorcycle-diaries.",
  tips: "Mosquito repellant is a must for even a short trip to the beach.",
  when: "December 2010",
  user: "58cb18d6140e350011b89c30",
  image: "https://static.pexels.com/photos/9537/sea-beach-sand-sun.jpg"
  },

  {
  title: "Massage Center by Ex-Prisoners",
  location: "Chiang Mai, Thailand",
  what: "Acitvity",
  description: "Massage Center by Ex-Prisoners is a massage parlour title all the massueses are ex-cons. Its really fun and they do a great job. ",
  tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
  when: "February 2013",
  user: "58cb18d6140e350011b89c30",
  image: "http://www.chiangmailocator.com/design/photosbiz/chiang-mai-khunka-massage-145.jpg"
  },
  {
  title: "Klazy House",
  location: "Koh Lanta, Thailand",
  what: "A place to stay",
  description: "I found the KLazy House by accident when I arrived on Koh Lanta with no place to stay. You take a tuc-tuc from the boat and he'll have to drop you off at the top of a dirt track about 15min drive from the boat. Trust me you need to walk down the path. The first accommodation you'll see if the Klazy House on the right. Its unmissable with all the hand crafted wood features from reception desk, bar and huts. There's a shared hut and private huts but all super cheap. Ko, the owner, also has chicken running around and it super welcoming. The huts are about 5mins from the beach. ",
  tips: "The tuc-tuc ride should be no more than 20baht. Hire a scooter to see the rest of the island. Take a padlock for valuables as security is non-existent.",
  when: "February 2013",
  user: "58cb18d6140e350011b89c2e",
  image: "https://media-cdn.tripadvisor.com/media/photo-s/09/f1/50/f8/lazy-days-bungalows.jpg"
},
{
  title: "Thai ice-cream",
  location: "Golden Temple, Bangkok, Thailand",
  what: "A place to eat",
  description: "Coconut ice-cream that is quite easily the best thing I've put in my mouth. Ever! If you take the Golden Temple tour, outside the gates when you exit there is a little cafe which sells smooth coconut ice-cream with toppings. My favorite is topped with condensed milk and sweet red beans.",
  when: "February 2013",
  user: "58cb18d6140e350011b89c2e",
  image: "http://images.budgettravel.com/thai-coconut-ice-cream-462015-175519_panoramic.jpeg"
},
  {
    title: "The Rising Sun",
    location: "Lynton EX35, England",
    what: "A place to Eat",
    description: "A traditional place with a non conventional menu. Excellent food and wine with great and local atmosphere. If you re lucky enough you can even catch a bit of the sun set light. Have a look at the village and take a walk around the village. If you take the road to the north side of it stop o your on a cliff to watch the sunset.",
    when: "May 2014",
    user: "58cb18d6140e350011b89c2d",
    image: "http://www.everythingexmoor.org.uk/uploads/image_store/images3/cs-0048-Rising-Sun,-Lynmouth.jpg"
  },
  {
    title: "Parque del Laberinto de Horta",
    location: "Barcelona, Spain",
    what: "Activity",
    description: "The oldest park in Barcelona, this space is a true undiscovered gem. Built in 1791 by landowner Joan Antoni Desvalls of d'Ardena, it served as the center of many cultural events during the 19th century. The park extends over 9 hectares, with many hidden corners to explore, including waterfalls and sculptures of mythological figures. Plus, the park was named after its beautifully maintained maze (or labyrinth), which is a great place to literally get lost!",
    when: "May 2012",
    user: "58cb18d6140e350011b89c2f",
    image: "http://www.conmishijos.com/assets/planes/1000/1206-parque-del-laberinto-de-horta.jpg"
  },
];





  //     console.log(user.username);
  //   });
  //   mongoose.connection.close();
  // });

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
      console.log(secret.title);
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
