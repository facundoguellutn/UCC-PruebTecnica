import React, { useState,useRef } from 'react'
import escudo from "../images/escudo.png"
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Navigate, useNavigate } from "react-router-dom";
import {styles} from "../styles"
import Cookies from 'js-cookie';
import{loginApi} from "../components/Axios/axiosApi"
import { Toast } from 'primereact/toast';

const Login = () => {
  let navigate = useNavigate();
  const toast = useRef(null);

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

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await loginApi.post('', values);
      Cookies.set('token', response.data.token, {expires: 1 / 24 });
      navigate("/usuarios")
    }
    catch(error){
      console.log(error)
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: error.response.data.message, life: 3000 });
    }
    // let myToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    // Cookies.set('token', myToken, {expires: 1 / 24 });
    
  }
  return (
    <div className={styles.screen}>
      <Toast ref={toast} position="top-center" />
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