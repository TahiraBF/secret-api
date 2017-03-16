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

// const secrets = [
//   {
//   where: "Chefchaouen, Morocco",
//   location: "Medina",
//   what: "Hotel Dar Dadicilef",
//   description: "This is the best place to stay if you're going to spend a few days in Chefchaouen. Free breakfast along with one of the best views of the city from their terrace.",
//   tips: "This place is very hard to find online. If you can get access to their phone number, call them directly to book. Also, their address isn't on google maps so you'll need to call and ask for directions if it's your first time.",
//   when: "September 2016",
//   user: "58c7c75941d3c96be663e2fb",
//   image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjR6NC2yMzSAhUGthoKHQggDzUQjRwIBw&url=http%3A%2F%2Fwww.letstravelsomewhere.com%2Ftravel-inspiration%2Fsandra-jordan-chefchaouen-morocco%2F&bvm=bv.149093890,d.d24&psig=AFQjCNE09XW_AXBuSOTB_Cvf3jo_p45RRg&ust=1489256896686697"
//   },
//
//
// {
// where: "Getaria, Spain",
// location: "Monte de San Anton",
// what: "Viewpoint",
// description: "This short little hike up the San Anton mountain will without a doubt be worth the amazing views you get at the end. Located right next to the port, the top of the mountain gets you a 360 view surrounded by the sea and the town of Getaria. While the town of Getaria does get a good bit of tourists in peak summer time (while we were there), we didn't come across any tourists on this hike, just a few friendly locals as it's a good spot to bring dogs.",
// tips: "The path starts off as a road but eventually turns to gravel and dirt, so make sure you bring comfortable shoes!",
// when: "July 2016",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjxrbHDyMzSAhWFrxoKHVrDDQ0QjRwIBw&url=https%3A%2F%2Fwinetourismspain.com%2F399%2Fgetaria-from-san-sebastian-wine-and-food-tour%2F&bvm=bv.149093890,d.d24&psig=AFQjCNEGlMCBvKlN_ObDycpxdSPzaBc4eQ&ust=1489256923033262"
// },
//
// {
// where: "New Orleans, USA",
// location: "Port of Call",
// what: "Restaurant",
// description: "Amazing little restaurant located in New Orleans, Louisiana. They have the best hamburger and baked potato in the city. While you can find hurricanes just about anywhere, only Port of Call has the monsoon...make sure you get one!",
// tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
// when: "December 2016",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjStcegx8zSAhXJfRoKHWDrCDMQjRwIBw&url=http%3A%2F%2Fsetthetrotline.com%2F2012%2F04%2F02%2Fthe-best-burger-ive-ever-had%2F&psig=AFQjCNFOlH_8rUm78zoldlVIwJMXYeWMKg&ust=1489256556787555"
// },
//
// {
// where: "Lisbon, Portugal",
// location: "Casa de Fado",
// what: "Place to Eat",
// description: "While I haven't seen them all, this has to be the best Fado house in Lisbon. Fado restaurants are popping up all over Lisbon, but this one has been around for a while and has a very authentic feel. Recommended to me by a friend from Lisbon, this one is strictly for locals and it's unusual to find a tourist here. Although they only had a few items on their menu, it was made up by the quality. The live Fado music is truly one of a kind here and it's a magical experience you need to see.",
// tips: "This restaurant is located in a sketchier corner of Alfama so beware at night! I've never been robbed going to this restaurant but I have heard that it happens from time to time.",
// when: "February 2014",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjfobOnyMzSAhVGiRoKHVDiBzQQjRwIBw&url=https%3A%2F%2Fwww.tripadvisor.com%2FRestaurant_Review-g189106-d3847494-Reviews-Casa_De_Fados_Maria_Severa-Evora_Evora_District_Alentejo.html&bvm=bv.149093890,d.d24&psig=AFQjCNHK1iwrQii__t6mYXkhcGmINIsBCA&ust=1489256860984417"
// },
//
// {
// where: "San Sebastian, Spain",
// location: "Rekondo",
// what: "Place to Eat",
// description: "Hidden in the mountains, this \"sideria\" is truly one of a kind. It has an amazing view from the terrace and you get incredible views to go along with your meal. If you simply want a glass of wine and enjoy the sunset, they have a great bar that overlooks their orchards. Great place to go with kids as well!",
// tips: "This place is hard to reach so you can only get there by car.",
// when: "June 2015",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi_qKeCyMzSAhVCiRoKHdgTCzQQjRwIBw&url=https%3A%2F%2Facademiavascadegastronomia.com%2Frestaurante%2Frekondo%2F&bvm=bv.149093890,d.d24&psig=AFQjCNGze82Bgj-WoCSwWK5cb7Z8VUdaPg&ust=1489256771711435"
// },
//
// {
// where: "Madrid, Spain",
// location: "Hombres Gin",
// what: "Place to Drink",
// description: "Great little bar with the best cocktails in Madrid! They only place 80's Spanish music so be prepared for a flashback!",
// tips: "Thursdays are the best night to go. Avoid Saturdays as they get super packed!",
// when: "January 2017",
// user: "58c7c75941d3c96be663e2fc",
// image: "http://thedrinknation.com/uploads/pdx%20gt.jpg"
// },
//
// {
// where: "Barcelona, Spain",
// location: "Koku Kitchen",
// what: "Place to Eat",
// description: "Nice place to eat Japanese food in Barcelona. It's a small restaurant so it gets packed easily. On Fridays and Saturdays you can expect wait but it's well worth it!",
// tips: "There are two floors, the top floor is buns and the bottom floor is ramen. There are two different kitchens, however so you can only order from each floors respective kitchen. Make sure you check the menu before you sit.",
// when: "March 2017",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjM9JTYx8zSAhVHQBoKHX5WBDQQjRwIBw&url=http%3A%2F%2Fwww.historiasdeunabstracto.com%2F%3Fp%3D4892&bvm=bv.149093890,d.d24&psig=AFQjCNGXm-7d-u2Pq8y4diiwvggGpG0R5A&ust=1489256693504482"
// },
//
// {
// where: "San Diego, USA",
// location: "El Dorado Bar",
// what: "Place to Drink",
// description: "Cool little dive bar in the North Park neighborhood in San Diego. Great cocktails, cool music and nice atmosphere. They also have a patio area in the back so you can enjoy the terrific San Diego weather while you drink.",
// tips: "Even though the bar closes at 2am, they usually do last call at 1:30am.",
// when: "June 2016",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiUm_7Jx8zSAhWCBBoKHSXSBzQQjRwIBw&url=http%3A%2F%2Fwww.sandiegoreader.com%2Fnews%2F2014%2Fjul%2F02%2Fblurt-el-dorado-rebrand%2F&bvm=bv.149093890,d.d24&psig=AFQjCNFePWdoLH3prGD0YDw4HYfxrWjFjg&ust=1489256671662342"
// },
//
// {
// where: "California, USA",
// location: "Bodega Bay",
// what: "Activity",
// description: "This outdoor picnic area sells raw oysters on the half shell so you can buy the by the sack and enjoy them outside. They are as fresh as they come since they catch the oysters right there in Bodega Bay. You can rent out the tools to shuck from the oyster farm or bring your own. They also sell alcohol but you can bring it yourself if you'd like. Wonderful place to enjoy oysters outdoors and get a great view of the bay!",
// tips: "This place gets packed on Saturdays and Sundays and they have limited seating so be sure to get there by 10am or expect a wait of at least 2 hours. Everything is outdoors so not a good place to go if it's raining.",
// when: "May 2015",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwixocu_x8zSAhVKahoKHTGZBzQQjRwIBw&url=http%3A%2F%2Fwww.daytrippen.com%2Ftomales-bay-day-trip%2F&bvm=bv.149093890,d.d24&psig=AFQjCNE4BPQqfQIyf_OCI5mTS5mp3q_d8w&ust=1489256645461010"
// },
//
// {
// where: "New York, USA",
// location: "DUMBO, Brooklyn",
// what: "Activity",
// description: "Just on the other side of Manhatten in Brooklyn, there's a little green area in Dumbo where you get a great view of the World Trade Center from across the river. It's at the base of the Brooklyn and Manhattan bridges overlooking the water.",
// tips: "The neighborhood is a bit quiet so it's hard to find a place to eat or drink outside of work hours.",
// when: "January 2016",
// user: "58c7c75941d3c96be663e2fc",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiin-TZyMzSAhUCORoKHQHgATQQjRwIBw&url=https%3A%2F%2Fbrooklyncupcake.wordpress.com%2F2013%2F04%2F24%2Fnycs-best-kept-secret-dumbo%2Fdumbo-brooklyn-bridge-013%2F&bvm=bv.149093890,d.d24&psig=AFQjCNGFRGWG3gMbqQcdLMqaezmIIUK-dA&ust=1489256955255878"
// },
//
// {
// where: "Austin, USA",
// location: "Dos Amigos Taco Truck",
// what: "Place to Eat",
// description: "Some of the best tacos you'll find in Texas. They have authentic Oaxacan tacos and little else on their menu.",
// tips: "It's a taco truck so the location varies every day. Check their twitter (@dosamigostacotruck) to find out where they are that day.",
// when: "December 2016",
// user: "58c7c75941d3c96be663e2fd",
// image: "https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi2uq2vx8zSAhWIAxoKHdvaCDQQjRwIBw&url=http%3A%2F%2Fwww.lawyersgunsmoneyblog.com%2F2016%2F10%2Fa-wall-of-taco-trucks&bvm=bv.149093890,d.d24&psig=AFQjCNHoe2td-AS3K5xDs9Pwn5VVh36xYg&ust=1489256612209001"
// },
//
//   {
//   where: "Bogota, Colombia",
//   location: "Chicó norte",
//   what: "Hotel Click-Clack",
//   description: "Awesome. A really cool hotel. A giant plant wall greets as you walk in. The cocktail bar in the basement has innovative literary-themed cocktails. The place to be and be seen.",
//   tips: "Don't skip the free breakfast.",
//   when: "January 2016",
//   user: "58c7c75941d3c96be663e2fd",
//   image: "https://exp.cdn-hotels.com/hotels/7000000/6370000/6361800/6361784/6361784_112_z.jpg"
//   },
//
//   {
//   where: "Montevideo, Uruguay",
//   location: "",
//   what: "View",
//   description: "Its worth while hiring a scooter when you arrive here. They are easily available from the beach. Take the long open road out following the coast-line north of Montevideo to view the Darwin relics and feel part of the motorcycle-diaries.",
//   tips: "Mosquito repellant is a must for even a short trip to the beach.",
//   when: "December 2010",
//   user: "58c7c75941d3c96be663e2fd",
//   image: "https://static.pexels.com/photos/9537/sea-beach-sand-sun.jpg"
//   },
//
//   {
//   where: "Chiang Mai, Thailand",
//   location: "Chiang Mai",
//   what: "Acitvity",
//   description: "Massage Center by Ex-Prisoners is a massage parlour where all the massueses are ex-cons. Its really fun and they do a great job. ",
//   tips: "There could be a long wait during dinner time, make sure you get there early or be prepared to wait!",
//   when: "December 2016",
//   user: "58c7c75941d3c96be663e2fd",
//   image: "http://www.chiangmailocator.com/design/photosbiz/chiang-mai-khunka-massage-145.jpg"
//   },
//   {
//   where: "Koh Lanta, Thailand",
//   location: "Koh Lanta",
//   what: "Accommodation",
//   description: "I found the KLazy House by accident when I arrived on Koh Lanta with no place to stay. You take a tuc-tuc from the boat and he'll have to drop you off at the top of a dirt track about 15min drive from the boat. Trust me you need to walk down the path. The first accommodation you'll see if the Klazy House on the right. Its unmissable with all the hand crafted wood features from reception desk, bar and huts. There's a shared hut and private huts but all super cheap. Ko, the owner, also has chicken running around and it super welcoming. The huts are about 5mins from the beach. ",
//   tips: "The tuc-tuc ride should be no more than 20baht. Hire a scooter to see the rest of the island. Take a padlock for valuables as security is non-existent.",
//   when: "February 2013",
//   user: "58c7c75941d3c96be663e2fd",
//   image: "http://www.chiangmailocator.com/design/photosbiz/chiang-mai-khunka-massage-145.jpg"
// },
// {
//   where: "Thailand",
//   location: "Bangkok",
//   what: "Eat",
//   description: "Coconut ice-cream that is quite easily the best thing I've put in my mouth. Ever! If you take the Golden Temple tour, outside the gates when you exit there is a little cafe which sells smooth coconut ice-cream with toppings. My favorite is topped with condensed milk and sweet red beans.",
//   when: "February 2013",
//   user: "58c7c75941d3c96be663e2fd",
//   image: "http://images.budgettravel.com/thai-coconut-ice-cream-462015-175519_panoramic.jpeg"
// },
//   {
//     where: "The Rising Sun",
//     location: "Lynton EX35, England",
//     what: "A place to Eat",
//     description: "A traditional place with a non conventional menu. Excellent food and wine with great and local atmosphere. If you re lucky enough you can even catch a bit of the sun set light. Have a look at the village and take a walk around the village. If you take the road to the north side of it stop o your on a cliff to watch the sunset.",
//     when: "May 2014",
//     user: "58c7c75941d3c96be663e2fd",
//     image: "http://www.everythingexmoor.org.uk/uploads/image_store/images3/cs-0048-Rising-Sun,-Lynmouth.jpg"
//   }
// ];


// const pictures = [
//   {
//     pic_path: '/uploads/1489009898799.JPG',
//     pic_name: "luft",
//   	user: "58bed614f23e9c706c604fbc",
//     profile: true
//   }
// ];



  //     console.log(user.username);
  //   });
  //   mongoose.connection.close();
  // });


User.create(users, (err, docs)=> {
  if (err){
    throw(err);}

    docs.forEach( (user)=>{

      console.log(user.username);
    });
    mongoose.connection.close();
  });

//
// Secret.create(secrets, (err, posts)=> {
//   if (err){
//     throw(err);
//   }
//     posts.forEach( (secret)=>{
//       console.log(secret.where);
//     });
//     mongoose.connection.close();
// });

// Picture.create(pictures, (err, pics)=> {
//   if (err){
//     throw(err);
//   }
//     pics.forEach( (pic)=>{
//       console.log(pic.pic_name);
//     });
//     mongoose.connection.close();
// });
