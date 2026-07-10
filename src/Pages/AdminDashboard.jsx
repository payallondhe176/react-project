import React, { useEffect, useState } from 'react'
import { api } from '../data'
import UserForm from './UserForm'

const AdminDashboard = () => {
    
    const [users,setUsers]= useState([])
    const [edituser , seteditUser ] = useState(null)

    const fetchAllUsers = async ()=>{
        let all = await api.get(`/users`);
        setUsers(all.data);
    }

    useEffect(()=>{
        fetchAllUsers();
    },[])
    
    const handleDelete= async (id)=>{
        await api.delete(`/users/${id}`)
        fetchAllUsers()
    }

  return (
    <div>
        <center>
            <h1> All USers DAta </h1>
            <UserForm edituser={edituser} seteditUser={seteditUser} fetchAllUsers={fetchAllUsers}/>
            <table border={2}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((u)=>(
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button onClick={()=>handleDelete(u.id)}> Delete </button>
                                    <button onClick={()=>seteditUser(u)}>Edit </button>
                                </td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </center>
    </div>
  )
}

export default AdminDashboard

