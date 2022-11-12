const express = require('express')
const cors = require('cors')

var users = [{
  id: 1,
  name: 'Ayush',
  dob: '22-Aug-2002',
  contact: 91738387448
},
{
  id: 2,
  name: 'Rishabh',
  dob: '22-Aug-2002',
  contact: 91738387448
},
{
  id: 3,
  name: 'Golu',
  dob: '22-Aug-2002',
  contact: 91738387448
},
{
  id: 4,
  name: 'Shivam',
  dob: '22-Aug-2002',
  contact: 91738387448
}]

const app = express();

app.use(cors());

// middleware
app.use(express.json())

// http://localhost:1111/users
app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/user/view/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find(x => x.id == id);

  res.json(user);
})

app.delete('/user/delete/:id', (req, res) => {
  const { id } = req.params;

  console.log('ID', id);
  const index = users.findIndex(x => x.id == id);
  users.splice(index, 1);

 // users = users.filter(x => x.id != id);

  console.log('USERS', JSON.stringify(users))
  
  res.json(users);
})

app.post('/user/add', (req, res) => {
  const { name, dob, contact } = req.body;

  console.log('BODY', req.body);

  const maxValue = Math.max(...users.map(x => x.id));
  const length = users.push({ id: maxValue + 1, name, dob, contact })
  res.json(users[length - 1])
})

app.put('/user/edit/:id', (req,res) => {
  const {name,dob,contact} = req.body;
  const { id } = req.params;

  const user = users.find(x => x.id == id);
  user.name = name;
  user.dob = dob;
  user.contact = contact;

  const index = users.findIndex(x => x.id == id)

  users.splice(index, 1, user);

  res.json(user);
})

app.listen(1111, () => {
  console.log('Node app running on port no 1111');
})


