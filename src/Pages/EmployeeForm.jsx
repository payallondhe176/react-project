import React, { useEffect, useState } from 'react'
import { api } from '../data'



// const EmployeeForm = ({editemp, setEditEmp,fetchEmployees }) => {
const EmployeeForm = ({editemp, fetchEmployees }) => {

  const [form ,setForm]= useState({name:'',dept:'',salary:'',email:''})

  useEffect(()=>{
    if(editemp)
      setForm(editemp)
  },[editemp])


  const handleSubmit= async (e)=>{
  e.preventDefault();
  if(editemp)
    await api.put(`/employees/${editemp.id}`,form)
  else
    await api.post(`/employees`,form)


  setForm({name:'',dept:'',salary:'',email:''});
  // setEditEmp(null);
  fetchEmployees();
  }

  const handleChange=(e)=>{
   setForm({...form , [e.target.name]:e.target.value})
  }

  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
      name : <input type="text" name='name' value={form.name} onChange={handleChange} required/ > <br /><br />
      DEpt : <input type="text" name='dept' value={form.dept} onChange={handleChange} required/ > <br /><br />
      salary : <input type="text" name='salary' value={form.salary} onChange={handleChange} required/ > <br /><br />
      Email : <input type="text" name='email' value={form.email} onChange={handleChange} required/ > <br /><br />
      <button type='submit' >
        {editemp ? "update Student " : "Add Student"}
         </button>
        </form>
      </center>
    </div>
  )
}

export default EmployeeForm



