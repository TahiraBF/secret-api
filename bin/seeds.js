const mongoose     = require('mongoose');
const User         = require('../models/user');
mongoose.connect('mongodb://localhost/secret-place');


const users = [
  { username      : "FruitLoop",
    password      : "123",
    name          : "Fruit",
    email         : "Loop@fruit.com",
    travellerType : "Nomad",
    description   : "I have been travelling from longer than I could walk.",
    refer         : "brutus@is.com",
    isDisclaimer  : true,
    role          : 'User'

  },
  { username      : "Miss Priss",
    password      : "123",
    name          : "Prissy",
    email         : "p@p.com",
    travellerType : "Lujo",
    description   : "I never go anywhere untattended by a hoard of helpers. But i can keep a secret",
    refer         : " ",
    isDisclaimer  : true,
    role          : 'User'

  },
  { username      : "DaveD",
    password      : "123",
    name          : "Dave",
    email         : "dd@fruit.com",
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
  })
  mongoose.connection.close();
});
