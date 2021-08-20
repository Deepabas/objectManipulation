let express = require('express');
let app = express();
app.use(express.json());
const fs = require('file-system');

let inputData = require('./input.json');

const data = inputData.map(x => {
  const s = {
    firstName: x.name.first,
    lastName: x.name.last,
    ...x
  }
  delete s.name
  return s
})

app.get('/user', (req, res) => {
  const a = JSON.stringify(data, null, 4);
  fs.writeFile('./user.json', a);
  res.send(a)
});

app.delete('/delete/:id', (req, res) => {
const id = req.params.id
  // console.log(id)
  //get the existing userdata
  const existUsers = getUserData('user2.json')
  //filter the userdata to remove it
  const filterUser = existUsers.filter((user) => {
    if (user._id !== id) {
      return user;
    }
  });
  //save the filtered data
  saveUserData(filterUser, 'user3.json')

  //res.send({success: true, msg: 'User removed successfully'})
  res.send(filterUser)

})

/* util functions */

//read the user data from json file
const saveUserData = (data, path) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(path, stringifyData)
}

//get the user data from json file
const getUserData = (fileName) => {
  const jsonData = fs.readFileSync(fileName, "utf-8")
  // console.log(jsonData)
  return JSON.parse(jsonData);
}





app.listen(8080, () => console.log('Server running on port 8080!'))
