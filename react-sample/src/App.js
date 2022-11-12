import React, { useEffect, useState } from 'react'
import { AddUser } from './AddUser';


function App() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDetail, setEditDetail] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:1111/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      setUsers(res);
    });
  
  }, [])
  

  const onView = (id) => {
    fetch('http://localhost:1111/user/view/'+ id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      setSelectedUser(res);
    });
  }

  const onUpdate = (id) => {
    const user = users.find(x => x.id === id);
    setEditDetail(user);
  }

  const onDelete = (id) => {
    fetch('http://localhost:1111/user/delete/'+ id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      setUsers(res);
    });
  }

  const addUser = (user) => {
    setUsers([...users, user]);
  }
  return (<>
  
  <AddUser addUser={addUser} editDetail={editDetail} />

    <table>
      <tr>
        <th>Name</th>
        <th>Dob</th>
        <th>Contact No</th>
      </tr>
      {users.map(x => (
        <tr>
          <td>{x.name}</td>
          <td>{x.dob}</td>
          <td>{x.contact}</td>
          <td>
            <div>
              <button onClick={() => onView(x.id)}>View</button>
              <button onClick={() => onUpdate(x.id)}>Update</button>
              <button onClick={() => onDelete(x.id)}>Delete</button>
            </div>
          </td>
        </tr>
      ))}
    </table>

{selectedUser && (
    <section>
    <h1> Selected Details View</h1>
    <div>
      <label>Name</label>
      <spn>{selectedUser.name}</spn>
    </div>
    <div>
      <label>DOB</label>
      <spn>{selectedUser.dob}</spn>
    </div>

    <div>
      <label>Contact</label>
      <spn>{selectedUser.contact}</spn>
    </div>
  </section>
  )
}
 
  </>);
}

export default App;
