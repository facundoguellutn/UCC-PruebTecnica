import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { DataTable } from 'primereact/datatable';
import SkeletonTabla from "../Skeleton/SkeletonTabla"
import { Column } from 'primereact/column';
import DialogUsuario from './DialogUsuario';

const Users = () => {
    const [users, setUsers] = useState(undefined)
    const [selectedUser, setSelectedUser] = useState({nombre:"",apellido:"",direccion:"",cantidadProfesiones:""});
    const [dialogUsuario, setDialogUsuario] = useState(false);
    const[dialogNuevoUsuario, setDialogNuevoUsuario] = useState(false);
    useEffect(() => {
        setUsers(undefined)
        setTimeout(() => {
            setUsers([
                {
                    nombre: "Juan",
                    apellido: "Perez",
                    direccion: "Calle 123",
                    cantidadProfesiones: "5",
                    profesiones:["Profesion 1","Profesion 2","Profesion 3","Profesion 4"]
                },
                {
                    nombre: "María",
                    apellido: "Gómez",
                    direccion: "Avenida 456",
                    cantidadProfesiones: "3"
                },
                {
                    nombre: "Luis",
                    apellido: "Rodríguez",
                    direccion: "Calle 789",
                    cantidadProfesiones: "2"
                },
                {
                    nombre: "Ana",
                    apellido: "Martínez",
                    direccion: "Avenida 987",
                    cantidadProfesiones: "4"
                },
                {
                    nombre: "Carlos",
                    apellido: "López",
                    direccion: "Calle 654",
                    cantidadProfesiones: "6"
                },
                {
                    nombre: "Laura",
                    apellido: "Sánchez",
                    direccion: "Avenida 321",
                    cantidadProfesiones: "1"
                },
                {
                    nombre: "Roberto",
                    apellido: "Fernández",
                    direccion: "Calle 555",
                    cantidadProfesiones: "7"
                },
                {
                    nombre: "Sofía",
                    apellido: "Ramírez",
                    direccion: "Avenida 888",
                    cantidadProfesiones: "2"
                },
                {
                    nombre: "Pedro",
                    apellido: "González",
                    direccion: "Calle 222",
                    cantidadProfesiones: "3"
                },
                {
                    nombre: "Carmen",
                    apellido: "Luna",
                    direccion: "Avenida 777",
                    cantidadProfesiones: "5"
                },
                {
                    nombre: "Miguel",
                    apellido: "Díaz",
                    direccion: "Calle 444",
                    cantidadProfesiones: "4"
                },
                {
                    nombre: "Isabel",
                    apellido: "Ortega",
                    direccion: "Avenida 666",
                    cantidadProfesiones: "2"
                },
                {
                    nombre: "Manuel",
                    apellido: "Torres",
                    direccion: "Calle 111",
                    cantidadProfesiones: "3"
                },
                {
                    nombre: "Elena",
                    apellido: "Vargas",
                    direccion: "Avenida 999",
                    cantidadProfesiones: "1"
                },
                {
                    nombre: "Javier",
                    apellido: "Lara",
                    direccion: "Calle 333",
                    cantidadProfesiones: "6"
                }
            ])
        }, 2000);
    }, [])

    const onRowSelect = (event) => {
        console.log(event.value);
        setSelectedUser(event.value)
        setDialogUsuario(!dialogUsuario)
    };

    const nombreApellidoTemplate = (rowData) => {
        return <span>{rowData.apellido} {rowData.nombre}</span>;
    };

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col justify-start md:flex-row  md:items-center  md:justify-between md:w-full '>
                <div className='flex flex-row justify-center items-center md:justify-start'>
                    <Icon icon="mdi:users" className='text-blue300' width="50" />
                    <h1 className='ml-4 text-[40px] text-blue300'>Usuarios</h1>
                </div>
                <button className='flex flex-row items-center justify-center  px-4 py-2 text-[18px] text-blue300 bg-white border-[1px] border-blue300 rounded-[10px]'> Agregar usuario <Icon icon="mingcute:add-fill" width="20" className='text-blue300 ml-2' /></button>
            </div>
            <h1 className='text-[24px] text-blue500 text-left mb-2'>Cantidad de usuarios: <span className='text-blue200'>24</span></h1>
            {users === undefined ? <SkeletonTabla /> :
                <DataTable value={users} stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }} selectionMode="single" selection={selectedUser} onSelectionChange={onRowSelect}>
                    <Column field="nombre" header="Nombre" body={nombreApellidoTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column field="direccion" header="Dirección" sortable style={{ width: '25%' }}></Column>
                    <Column field="cantidadProfesiones" header="Cantidad de profesiones" sortable style={{ width: '25%' }}></Column>
                </DataTable>}
            <DialogUsuario visible={dialogUsuario} setVisible={setDialogUsuario} selectedUser={selectedUser} />
        </div>
    )
}

export default Users