import React, { useState } from 'react'
import './App.css'
import { api } from './data'
import AdminDashboard from './Pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'


const App = () => {

  const [form,setForm]= useState({email:'',password:''})
  const [role,setRole]= useState(null)
  const [show,SetShow]= useState(null)

  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value})
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const  all = await api.get(`/users`).then((res)=>res.data)
  all.map((u)=>{
        if(u.email === form.email && u.password === form.password ){
      setRole(u.role)
      SetShow(true)
    }
  })

    setForm({email:'',password:''})
  }
  return (
    <div>
      <center>
              <h2> Login App </h2>
          <form onSubmit={handleSubmit}>
            Email : <input type="text" name='email' value={form.email} onChange={handleChange} required /> <br /><br />
            Password : <input type="text" name='password' value={form.password} onChange={handleChange} required /> <br /><br />
            <button type='submit'> LOgin </button>
            </form> 

      </center>

  <h2>{
    show && 
     role === "admin" ?  <AdminDashboard/> : 
     role ==="hr" ? <EmployeeDashboard/> : ''
    }</h2>

    </div>
  )
}

export default App