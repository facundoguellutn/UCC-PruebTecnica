import React, { useState } from 'react'
import escudo from "../images/escudo.png"
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Navigate, useNavigate } from "react-router-dom";
import {styles} from "../styles"

const Login = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/usuarios")
  }
  return (
    <div className={styles.screen}>
      <img src={escudo} alt="" className='mb-4' />
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col py-4 px-4 rounded-[20px] border-[1px] border-[#BCBCBE] w-[250px] sm:w-[370px]'>
        <h1 className='text-blue500 text-[26px] mb-4'>Iniciar sesion</h1>
        <InputText value={values.email} placeholder='Email' name='email' required={true} type='email' onChange={(e) => handleChange(e)} className='w-full' style={{ marginBottom: "15px" }} />
        <Password value={values.password} placeholder='Contraseña' name='password' toggleMask feedback={false}  required={true}  onChange={(e) => handleChange(e)} className='w-full' />
        <button className='mt-6 w-full bg-blue500 text-white py-2 rounded-[10px] text-[24px]' type='submit'>Ingresar</button>
        <h1 className='mt-4 text-blue500'>No tenes una cuenta?<span className='text-blue200 cursor-pointer' onClick={()=>{navigate("registro")}}> Registrate aqui</span> </h1>
      </form>

    </div>
  )
}

export default Login