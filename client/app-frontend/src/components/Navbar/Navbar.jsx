import React, { useState } from 'react'
import logo from "../../images/logo.png"
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import Cookies from 'js-cookie';
import { logoutApi } from '../Axios/axiosApi';

const Navbar = () => {
  const [logged, setLogged] = useState(false)
  const [opened, setOpened] = useState(false)
  let navigate = useNavigate();
  const token = Cookies.get('token');
  if (token !== undefined) {
    var flag=true
  }


  const logoutAction = async() => {
    Cookies.remove('token');
    try{
      const response = await logoutApi.post(''); 
      navigate("/");
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <div className='fixed w-screen hidden md:flex flex-row justify-between items-center py-4 px-8 md:px-10 lg:px-12 xl:px-20'>
        <img src={logo} className='h-[45px]' alt="" />
        {!flag && (
          <>
            <div className='flex flex-row items-center '>
              <button className='px-4 py-2 text-[20px] text-blue500 rounded-[10px] bg-white border-[1px] border-blue500 mr-4 hover:bg-blue500 hover:border-blue500 hover:text-white' onClick={() => { navigate("/") }}>Iniciar sesion</button>
              <button className='px-4 py-2 text-[20px]  rounded-[10px]  border-[1px]  bg-blue500 border-blue500 text-white' onClick={() => { navigate("registro") }}>Crear cuenta</button>
            </div>
          </>
        )}
        {flag && (
          <>
            <button className='px-4 py-2 text-[20px] text-blue500 flex flex-row items-center justify-center' onClick={() => { logoutAction()}}>Salir <Icon icon="material-symbols:logout" className='text-blue500 ml-2' /></button>
          </>
        )}
      </div>
      <div className='w-screen flex flex-row md:hidden justify-between items-center py-4 px-8 md:px-10 lg:px-12 xl:px-20 myNav bg-white'>
        <img src={logo} className='h-[45px]' alt="" />
        <div
          id="nav-icon3"
          style={{
            margin: "0 auto",
            marginLeft: "0px",
            marginRight: "0px",
            position: "absolute",
            right: "25px",
          }}
          className={opened ? "open p-0 m-0 w-auto" : "close"}
          onClick={() => setOpened(!opened)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>


      </div>
      <div
        style={{ zIndex: "25", marginTop: "0px" }}
        className={
          opened
            ? "miDiv mostrar h-screen w-screen bg-[#F0F0F0] absolute lg:hidden"
            : "miDiv ocultar"
        }
      >
        <div className="flex flex-col mt-6 ml-[2rem] text-[20px] font-regular">
          <div className="h-[60px]"></div>
          <div className="text-left text-[28px] text-blue200 mb-4">
            <h1>Mas opciones</h1>
          </div>
        </div>
        {!flag && (
          <div className='flex flex-col items-start ml-4'>
            <button className='px-4 py-2 text-[20px] text-blue500' onClick={() => { setOpened(!opened);navigate("/")}}>Iniciar sesion</button>
            <button className='px-4 py-2 text-[20px]  text-blue500' onClick={() => { setOpened(!opened);navigate("registro") }}>Crear cuenta</button>
          </div>
        )}
        {flag && (
          <button className='px-4 py-2 text-[20px] text-blue500 flex flex-row items-center justify-center ml-4' onClick={() => { setOpened(!opened);logoutAction()}}>Salir <Icon icon="material-symbols:logout" className='text-blue500 ml-2' /></button>

        )}
      </div>
    </>

  )
}

export default Navbar