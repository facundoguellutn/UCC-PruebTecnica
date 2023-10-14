import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { apiRoute } from '../Axios/axiosApi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const DialogNuevaProfesion = ({ visible, setVisible, show,flag,setFlag }) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [values, setValues] = useState({ profesion: "", descripcion: "" })
    const customHeader = () => {
        return (
            <div className='flex flex-row justify-center items-center'>
                <Icon icon="material-symbols:work" className='text-blue300' width="45" />
                <h1 className='ml-4 text-[30px] text-blue300'>Nueva profesion</h1>
            </div>
        )
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await apiRoute.post('/profesiones', values, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            show()
            setVisible(!visible)
            setFlag(!flag)
            console.log(e)
        }
        catch(e) {
            console.log(e)
        }
    }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setValues({
            profesion: "",
            descripcion: ""
        })
    }, [visible])
    return (
        <Dialog visible={visible} header={customHeader} onHide={() => { setVisible(false) }} className='modalDialog'>
            <div className='flex flex-col w-full pt-2'>
                <form onSubmit={handleSubmit}>
                    <label className='text-gray-400'>Profesión</label>
                    <InputText className='w-full' required={true} placeholder="Ingrese la profesión" value={values.profesion} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='profesion' />
                    <label className='text-gray-400'>Descripción</label>
                    <InputTextarea className='w-full' required={true} placeholder="Ingrese la descripción de la profesion" value={values.descripcion} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='descripcion' />
                    <div className='flex flex-row justify-center items-center'>
                        <button type="submit" className='text-[18px] bg-blue300 text-white w-full py-2 rounded-md flex flex-row items-center justify-center'>Guardar <Icon icon="ri:save-fill" width="20" className='ml-2' /></button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default DialogNuevaProfesion