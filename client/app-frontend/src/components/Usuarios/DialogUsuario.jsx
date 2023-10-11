import React, { useState,useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { styles } from '../../styles'

const DialogUsuario = ({ visible, setVisible, selectedUser }) => {
    const [values, setValues] = useState({})
    const [disabledFlag, setDisabledFlag] = useState(true)
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
                <h1 className='ml-4 text-[30px] text-blue300'>Datos del usuario</h1>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }

    useEffect(() => {
        let flag = true
        setDisabledFlag(flag)
        setValues(selectedUser)
    }, [visible])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Dialog visible={visible} header={customHeader} onHide={() => {setVisible(false)}} className='modalDialog'>
            <div className='flex flex-col w-full pt-2'>
                <form onSubmit={handleSubmit}>
                    <InputText className='w-full' required={true} placeholder="Nombre" value={values.nombre} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e)=>{handleChange(e)}} name='nombre'/>
                    <InputText className='w-full' required={true} placeholder="Apellido" value={values.apellido} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e)=>{handleChange(e)}} name='apellido'/>
                    <InputText className='w-full' required={true} placeholder="Direccion" value={values.direccion} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e)=>{handleChange(e)}} name='direccion'/>
                    <MultiSelect className='w-full' required={true} options={profesiones} name="profesiones" placeholder="Profesiones" value={values.profesiones} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e)=>{handleChange(e)}}/>
                    {!disabledFlag && (
                        <div className='flex flex-row justify-start items-center'>
                            <button type="submit" className='bg-blue300 text-white px-4 py-2 rounded-md'>Guardar</button>
                        </div>
                    )}
                </form>
                {disabledFlag && (
                    <div className='w-full flex flex-row items-center justify-center'>
                        <button className={styles.btn} style={{ marginRight: "20px" }} onClick={()=>{setDisabledFlag(!disabledFlag)}}>Editar <Icon icon="material-symbols:edit" width="20" className='ml-2' /></button>
                        <button className={styles.btn}>Borrar <Icon icon="material-symbols:delete" width="20" className='ml-2' /></button>
                    </div>
                )}

            </div>
        </Dialog>
    )
}

export default DialogUsuario