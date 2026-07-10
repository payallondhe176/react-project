import React, { useEffect, useState } from 'react'
import { api } from '../data'
import EmployeeForm from './EmployeeForm'

const EmployeeDashboard = () => {
  const [emp, setEmp] = useState([])
  const [editemp ,setEditEmp] = useState(null)


  const fetchEmployees = async ()=>{
    let all  = await api.get(`/employees`)
    setEmp(all.data)
  }

  useEffect(()=>{
    fetchEmployees();
  },[])

  
  const handleDelete = async (id)=>{
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  }
  return (
    <div>
      {/* <EmployeeForm editemp={editemp} setEditEmp={setEditEmp} fetchEmployees={fetchEmployees}/> */}
      <EmployeeForm editemp={editemp} fetchEmployees={fetchEmployees}/>


      <h2> employees Details </h2>
       
      <table border={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th> Dept</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            emp.map((s)=>(
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.dept}</td>
                <td>{s.salary}</td>
                <td>{s.email}</td>
                <td>
                  <button onClick={()=>handleDelete(s.id)}> Delete</button>
                  <button onClick={()=>setEditEmp(s)}> Edit </button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeDashboard