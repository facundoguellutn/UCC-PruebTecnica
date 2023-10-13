import React, { useState, useRef } from 'react'
import { styles } from '../styles'
import { Navigate, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { registroApi } from '../components/Axios/axiosApi';


const Registro = () => {
  let navigate = useNavigate();
  const toast = useRef(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: ""
  })
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha creado exitosamente su cuenta', life: 3000 });
  }

  const showWarn = () => {
    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Las contraseñas ingresadas no coinciden', life: 3000 });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.password === values.password2) {
      try {
        const response = await registroApi.post('', values)
        showSuccess()
        setTimeout(() => {
          navigate("/")
        }, 3000);
      }
      catch (error) {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Intente nuevamente', life: 3000 });
      }
    }
    else {
      showWarn()
    }
  }

  return (
    <div className={styles.screen}>
      <Toast ref={toast} position="top-center" />
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col py-4 px-4 rounded-[20px] border-[1px] border-[#BCBCBE] w-[250px] sm:w-[370px]'>
        <h1 className='text-blue500 text-[26px] mb-4'>Crear cuenta</h1>
        <InputText value={values.email} placeholder='Email' name='email' required={true} type='email' onChange={(e) => handleChange(e)} className='w-full' style={{ marginBottom: "15px" }} />
        <Password value={values.password} placeholder='Contraseña' name='password' required={true} type='password' onChange={(e) => handleChange(e)} style={{ marginBottom: "15px" }} />
        <Password value={values.password2} placeholder='Ingrese nuevamente la contraseña' name='password2' required={true} type='password' onChange={(e) => handleChange(e)} />
        <button className='mt-6 w-full bg-blue500 text-white py-2 rounded-[10px] text-[24px]' type='submit'>Crear cuenta</button>
        <h1 className='mt-4 text-blue500'>Ya tenes una cuenta?<span className='text-blue200 cursor-pointer' onClick={() => { navigate("/") }}> Ingresa aqui</span> </h1>
      </form>
    </div>
  )
}

export default Registro