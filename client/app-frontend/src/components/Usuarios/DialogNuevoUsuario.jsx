import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { styles } from '../../styles'

const DialogNuevoUsuario = ({ visible, setVisible, show }) => {
    const [values, setValues] = useState({})
    const profesiones = [
        "Profesion 1",
        "Profesion 2",
        "Profesion 3",
        "Profesion 4"
    ]
    const customHeader = () => {
        return (
            <div className='flex flex-row justify-center items-center'>
                <Icon icon="mdi:users" className='text-blue300' width="50" />
                <h1 className='ml-4 text-[30px] text-blue300'>Nuevo usuario</h1>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        show()
        setVisible(!visible)
        console.log(e)
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