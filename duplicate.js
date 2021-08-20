const express = require('express');
const app = express();
app.use(express.json());
let inputData = require('./input.json');
const _ = require("underscore")



//object manipulation
app.get('/asc',async (req,res)=> {
    const data = inputData.map(x => {
       const s = {
       name: x.name.first.concat(' ',x.name.last),
        age: x.age,
        company: x.company,
        email: x.email,
        favoriteFruit: x.favoriteFruit
       }
       return s;
     })
     var sorted = _.sortBy(( _.sortBy(data, 'age')), 'name');
     console.log()
   res.send(sorted);
   });

   app.get('/desc',async (req,res)=> {
    const data = inputData.map(x => {
       const s = {
        name: x.name.first.concat(' ',x.name.last),
        age: x.age,
        company: x.company,
        email: x.email,
        favoriteFruit: x.favoriteFruit
       }
       return s;
     })
     var sorted = _.sortBy(( _.sortBy(data, 'age')), 'name');
     sorted.reverse();

     console.log()
   res.send(sorted);
   });



app.listen(4200, () => console.log('Server running on port 4200!'))
