import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react';
import { DataTable } from 'primereact/datatable';
import SkeletonTabla from "../Skeleton/SkeletonTabla"
import { Column } from 'primereact/column';
import DialogUsuario from './DialogUsuario';
import DialogNuevoUsuario from './DialogNuevoUsuario';
import { Toast } from 'primereact/toast';
import { apiRoute } from '../Axios/axiosApi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';


const Users = () => {
    const toast = useRef(null);
    const [cantidad, setCantidad] = useState("0")
    const [flag, setFlag] = useState(false)
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [users, setUsers] = useState(undefined)
    const [selectedUser, setSelectedUser] = useState({ nombre: "", apellido: "", direccion: "", cantidadProfesiones: "", profesiones: ["", ""] });
    const [dialogUsuario, setDialogUsuario] = useState(false);
    const [dialogNuevoUsuario, setDialogNuevoUsuario] = useState(false);
    useEffect(() => {
        apiRoute.get('/usuarios', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            setUsers(response.data)
        }).catch(error => {
            console.log(error)
        })
        apiRoute.get('/usuarios/cantidad/obtener', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            setCantidad(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [flag])

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha registrado exitosamente el usuario', life: 3000 });
    }

    const onRowSelect = (event) => {
        console.log(event.value);
        setSelectedUser(event.value)
        setDialogUsuario(!dialogUsuario)
    };

    const nombreApellidoTemplate = (rowData) => {
        return <span>{rowData.apellido} {rowData.nombre}</span>;
    };

    const profesionesTemplate = (rowData) => {
        return <span>{rowData.profesiones.length}</span>;
    };

    const editar = () => {
        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha editado exitosamente el usuario', life: 3000 });
        setDialogUsuario(!dialogUsuario)
    }

    const borrar = () => {
        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha eliminado exitosamente el usuario', life: 3000 });
        setDialogUsuario(!dialogUsuario)
    }

    return (
        <div className='flex flex-col w-full'>
            <Toast ref={toast} position="top-center" />

            <div className='flex flex-col justify-start md:flex-row  md:items-center  md:justify-between md:w-full '>
                <div className='flex flex-row justify-center items-center md:justify-start'>
                    <Icon icon="mdi:users" className='text-blue300' width="50" />
                    <h1 className='ml-4 text-[40px] text-blue300'>Usuarios</h1>
                </div>
                <button className='flex flex-row items-center justify-center  px-4 py-2 text-[18px] text-blue300 bg-white border-[1px] border-blue300 rounded-[10px]' onClick={() => { setDialogNuevoUsuario(!dialogNuevoUsuario) }}> Agregar usuario <Icon icon="mingcute:add-fill" width="20" className='text-blue300 ml-2' /></button>
            </div>
            <h1 className='text-[24px] text-blue500 text-left mb-2'>Cantidad de usuarios: <span className='text-blue200'>{cantidad.cantidad}</span></h1>
            {users === undefined ? <SkeletonTabla /> :
                <DataTable value={users} stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }} selectionMode="single" selection={selectedUser} onSelectionChange={onRowSelect}>
                    <Column field="nombre" header="Nombre" body={nombreApellidoTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column field="direccion" header="Dirección" sortable style={{ width: '25%' }}></Column>
                    <Column field="cantidadProfesiones" body={profesionesTemplate} header="Cantidad de profesiones" sortable style={{ width: '25%' }}></Column>
                </DataTable>}
            <DialogUsuario visible={dialogUsuario} setVisible={setDialogUsuario} selectedUser={selectedUser} editar={editar} borrar={borrar} />
            <DialogNuevoUsuario visible={dialogNuevoUsuario} setVisible={setDialogNuevoUsuario} show={showSuccess} flag={flag} setFlag={setFlag}/>
        </div>
    )
}

export default Users