import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { styles } from '../../styles'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Tooltip } from 'primereact/tooltip';

const DialogUsuario = ({ visible, setVisible, selectedUser, editar, borrar }) => {
    const [values, setValues] = useState({})
    const [disabledFlag, setDisabledFlag] = useState(true)
    const [selectedProfesiones, setSelectedProfesiones] = useState([]);
    const profesiones = [
       "Profesion 1",
       "Profesion 2",
       "Profesion 3",
       "Profesion 4",
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
        editar()
    }
    const accept = () => {
        borrar()
    };

    const reject = () => {
    };

    const confirm1 = () => {
        confirmDialog({
            message: '¿Esta seguro que desea eliminar este usuario?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept,
            reject
        });
    };

    useEffect(() => {
        let flag = true
        setDisabledFlag(flag)
        setValues(selectedUser)
        let temp = []
        selectedUser.profesiones.map((profesion) => {
            temp.push(profesion.profesion)
        })
        setSelectedProfesiones(temp)
    }, [visible])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Dialog visible={visible} header={customHeader} onHide={() => { setVisible(false) }} className='modalDialog'>
            <div className='flex flex-col w-full pt-2'>

                <ConfirmDialog />
                <form onSubmit={handleSubmit}>
                    <label className='text-gray-400'>Nombre</label>
                    <InputText className='w-full' required={true} placeholder="Nombre" value={values.nombre} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='nombre' />
                    <label className='text-gray-400'>Apellido</label>
                    <InputText className='w-full' required={true} placeholder="Apellido" value={values.apellido} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='apellido' />
                    <label className='text-gray-400'>Dirección</label>
                    <InputText className='w-full' required={true} placeholder="Direccion" value={values.direccion} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='direccion' />
                    {disabledFlag && (
                        <div className='flex flex-col items-start'>
                            <h1 className='text-blue300 text-[24px]'>Profesiones</h1>
                            {values.profesiones != undefined && values.profesiones.map((profesion, index) => {
                                return (
                                    <div className='flex flex-row w-full items-center justify-between'>
                                        <Tooltip target=".logo"></Tooltip>
                                        <p className='text-[18px] text-blue500'>{profesion.profesion}</p>
                                        <p className='logo text-blue500' data-pr-tooltip={profesion.descripcion}><Icon icon="material-symbols:info" />
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {!disabledFlag && (
                        <>
                            <label className='text-gray-400'>Profesiones</label>
                            <MultiSelect className='w-full' required={true} options={profesiones}  name="profesiones" placeholder="Profesiones" value={selectedProfesiones} disabled={disabledFlag} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} />
                        </>)}
                    {!disabledFlag && (
                        <div className='flex flex-row justify-center items-center'>
                            <button type="submit" className='text-[18px] bg-white border-[1px] border-blue300 text-blue300 px-4 py-2 rounded-md mr-4' onClick={() => { setDisabledFlag(!disabledFlag) }}>Cancelar</button>
                            <button type="submit" className='text-[18px] bg-blue300 text-white px-4 py-2 rounded-md flex flex-row items-center justify-center'>Guardar <Icon icon="ri:save-fill" width="20" className='ml-2' /></button>

                        </div>
                    )}
                </form>
                {disabledFlag && (
                    <div className='w-full flex flex-row items-center justify-center'>
                        <button className={styles.btn} style={{ marginRight: "20px" }} onClick={() => { setDisabledFlag(!disabledFlag) }}>Editar <Icon icon="material-symbols:edit" width="20" className='ml-2' /></button>
                        <button className={styles.btn} onClick={() => { confirm1() }}>Borrar <Icon icon="material-symbols:delete" width="20" className='ml-2' /></button>
                    </div>
                )}

            </div>
        </Dialog>
    )
}

export default DialogUsuario