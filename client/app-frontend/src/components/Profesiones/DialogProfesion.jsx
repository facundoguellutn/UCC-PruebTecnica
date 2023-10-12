import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog';
import { Icon } from '@iconify/react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { styles } from '../../styles';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

const DialogProfesion = ({ visible, setVisible, selectedProfesion, borrar, editar }) => {
    const [values, setValues] = useState({
        profesion: "",
        descripcion: ""
    })
    const [disabledFlag, setDisabledFlag] = useState(true)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        let flag = true
        setDisabledFlag(flag)
        setValues(selectedProfesion)
    }, [visible])

    const customHeader = () => {
        return (
            <div className='flex flex-row justify-center items-center'>
                <Icon icon="material-symbols:work" className='text-blue300' width="45" />
                <h1 className='ml-4 text-[30px] text-blue300'>Datos de profesion</h1>
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
            message: '¿Esta seguro que desea eliminar esta profesión?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept,
            reject
        });
    };

    return (
        <Dialog visible={visible} header={customHeader} onHide={() => { setVisible(false) }} className='modalDialog'>
            <ConfirmDialog />
            <div className='flex flex-col w-full pt-2'>
                <form onSubmit={handleSubmit}>
                    <label className='text-gray-400'>Profesión</label>
                    <InputText className='w-full' required={true} placeholder="Profesion" value={values.profesion} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='profesion' disabled={disabledFlag} />
                    <label className='text-gray-400'>Descripción</label>
                    <InputTextarea className='w-full' required={true} placeholder="Descripcion" value={values.descripcion} style={{ marginBottom: "20px" }} onChange={(e) => { handleChange(e) }} name='descripcion' disabled={disabledFlag} />
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
                        <button className={styles.btn} onClick={(e) => { confirm1(e) }}>Borrar <Icon icon="material-symbols:delete" width="20" className='ml-2' /></button>
                    </div>
                )}

            </div>
        </Dialog>
    )
}

export default DialogProfesion