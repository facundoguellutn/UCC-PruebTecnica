import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { styles } from '../../styles'
import { apiRoute } from '../Axios/axiosApi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const DialogNuevoUsuario = ({ visible, setVisible, show,flag,setFlag }) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [values, setValues] = useState({})
    const [info, setInfo] = useState([])
    const [profesiones, setProfesiones] = useState([
        "Profesion 1",
        "Profesion 2",
        "Profesion 3",
        "Profesion 4"
    ])
    const customHeader = () => {
        return (
            <div className='flex flex-row justify-center items-center'>
                <Icon icon="mdi:users" className='text-blue300' width="50" />
                <h1 className='ml-4 text-[30px] text-blue300'>Nuevo usuario</h1>
            </div>
        )
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const profesionIDs = values.profesiones.map(profesionName => {
            const profesionInfo = info.find(profesionObj => profesionObj.profesion === profesionName);
            return profesionInfo ? profesionInfo.id : null;
        });
        const dataToSubmit = {
            ...values,
            profesiones: profesionIDs
        };
        try{
            const response = await apiRoute.post('/usuarios', dataToSubmit, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            console.log(response.data);
            setFlag(!flag)
            show()
            setVisible(!visible)
        }
        catch(error){
            console.log(error)
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
            nombre: "",
            apellido: "",
            direccion: "",
            profesiones: []
        })
        apiRoute.get('/profesiones', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            console.log(response.data)
            const profesionesArray = response.data.map(profesionObj => profesionObj.profesion);
            setInfo(response.data)
            setProfesiones(profesionesArray)
        }).catch(error => {
            console.log(error)
        })
    }, [visible])

    return (
        <Dialog visible={visible} header={customHeader} onHide={() => { setVisible(false) }} className='modalDialog'>
            <div className='flex flex-col w-full pt-2'>
                <form onSubmit={handleSubmit}>
                    <label className='text-gray-400'>Nombre</label>
                    <InputText className='w-full' required={true} placeholder="Ingrese nombre" value={values.nombre} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='nombre' />
                    <label className='text-gray-400'>Apellido</label>
                    <InputText className='w-full' required={true} placeholder="Ingrese apellido" value={values.apellido} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='apellido' />
                    <label className='text-gray-400'>Direccion</label>
                    <InputText className='w-full' required={true} placeholder="Ingrese una direccion" value={values.direccion} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='direccion' />
                    <label className='text-gray-400'>Profesiones</label>
                    <MultiSelect className='w-full' required={true} options={profesiones} name="profesiones" placeholder="Seleccione una o mas profesiones" value={values.profesiones} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} />
                    <div className='flex flex-row justify-center items-center'>
                        <button type="submit" className='text-[18px] bg-blue300 text-white w-full py-2 rounded-md flex flex-row items-center justify-center'>Guardar <Icon icon="ri:save-fill" width="20" className='ml-2' /></button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default DialogNuevoUsuario