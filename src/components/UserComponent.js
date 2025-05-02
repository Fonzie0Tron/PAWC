import React, { useState } from "react";

export default function UserComponent() {

    const [userName, setUserName] = useState('');
  
    const [users, setUsers] = useState([
       {id: 0, name: "John"},
       {id: 1, name: "Doe"},
     ]);
  
  
    function handleChangeInput(e) {
      setUserName(e.target.value)
    }
  
  
    function handleAddUser() {
     setUsers([
        ...users,
        {id: users.length, name: userName}
     ])
     setUserName('')
    } 
  
    return (
      <>
        <input value={userName} onChange={handleChangeInput} />
        <button onClick={handleAddUser}>Add</button>
        <ul>
            {users.map((user) => (
                <li>{user.name}</li>
            ))}
        </ul>
      </>
     )
  }
  