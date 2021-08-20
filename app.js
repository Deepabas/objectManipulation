
let express = require('express');
let app = express();
app.use(express.json());
const mongoose = require("mongoose");
const _ = require("underscore")


let inputData = require('./input.json');

app.get('/user', (req, res) => {
  res.send(inputData);
});

//query params
app.get('/age', (req, res) => {
  const data = inputData.map(x => {
    const s = {
      firstName : x.name.first,
     lastName : x.name.last,
     name: x.name.first.concat(' ',x.name.last),
     age: x.age,
 }
    return s;
  })
var filtered = _.where(data,
     {
      name:req.query.name,
        age:Number(req.query.age)
       });

  res.send(filtered);
});

//api params
app.get('/:_id', (req,res) => {

    const userData = _.where(inputData,{_id:(req.params._id)});
      res.send(userData)
});

//object manipulation
app.get('/',async (req,res)=> {
 const data = inputData.map(x => {
    // const s = {
    //   firstName : x.name.first,
    //   lastName : x.name.last,
    //   ...x
    // }
    // delete s.name
    // return s
    const s = {
      firstName : x.name.first,
     lastName : x.name.last,
     name: x.name.first.concat(' ',x.name.last),
     age: x.age,
     company: x.company,
     email: x.email,
     favoriteFruit: x.favoriteFruit
    }
    return s;
  })
res.send(data);
});



app.listen(3000, () => console.log('Server running on port 3000!'))

mongoose.connect('mongodb+srv://user:MbvyVlIqk0xlPnZs@cluster0.uxdtw.mongodb.net/test', {
        useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));
