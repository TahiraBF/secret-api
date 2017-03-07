const mongoose     = require('mongoose');
const User         = require('../models/user');
mongoose.connect('mongodb://localhost/secret-place');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;



var salt     = bcrypt.genSaltSync(bcryptSalt);



const users = [
  { username      : "Loop@fruit.com",
    password      : bcrypt.hashSync("123", salt),
    name          : "Fruit",
    travellerType : "Nomad",
    description   : "I have been travelling from longer than I could walk.",
    refer         : "brutus@is.com",
    isDisclaimer  : true,
    role          : 'User'

  },
  { username      : "p@p.com",
    password      : bcrypt.hashSync("123", salt),
    name          : "Prissy",
    travellerType : "Lujo",
    description   : "I never go anywhere untattended by a hoard of helpers. But i can keep a secret",
    refer         : " ",
    isDisclaimer  : true,
    role          : 'Admin'

  },
  { username      : "dd@fruit.com",
    password      : bcrypt.hashSync("abc", salt),
    name          : "Dave",
    travellerType : "Budget",
    description   : "I travelled across asia with nothing more than $4 in my pocket and flip-flops.",
    refer         : "anniehall@is.com",
    isDisclaimer  : true,
    role          : 'User'

  },
];



User.create(users, (err, docs)=> {
  if (err){
		throw(err);}

  docs.forEach( (user)=>{

		console.log(user.username);
  });
  mongoose.connection.close();
});
