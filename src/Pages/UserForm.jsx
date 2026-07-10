import React, { useEffect, useState } from 'react'
import { api } from '../data'

const UserForm = ({ edituser ,seteditUser, fetchAllUsers }) => {
    const [form,setForm]= useState({name:'',email:'',password:'',role:''})
    const handleChange =(e)=>{
    setForm({...form, [e.target.name]:e.target.value})
   }

    useEffect(()=>{
        if(edituser)
            setForm(edituser)

    },[edituser])

   const handleSubmit = async (e)=>{
     e.preventDefault();
      if (edituser)  {
        await api.put(`/users/${edituser.id}`,form)
      }
    else {
        await api.post(`/users`,form)
    }
    setForm({name:'',email:'',password:'',role:''})
    seteditUser(null);
    fetchAllUsers();

     
   }
  return (
    <div>
        <center>
            <form onSubmit={handleSubmit}>
                Name : <input type="text" name='name' value={form.name} onChange={handleChange} required/><br /><br />
                email : <input type="text" name='email' value={form.email} onChange={handleChange} required/><br /><br />
                password : <input type="text" name='password' value={form.password} onChange={handleChange} required/><br /><br />
                {/* Role : <input type="text" name='role' value={form.role} onChange={handleChange} required/><br /><br /> */}
               Role :
               <select name="role" value={form.role} onChange={handleChange}>
                <option value=" "> Select </option>
                <option value="admin"> Admin</option>
                <option value="hr"> HR </option>
               </select> <br /><br />
              <button> Add User</button>
            </form>
        </center>
    </div>
  )
}

export default UserForm