import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react';
import { DataTable } from 'primereact/datatable';
import SkeletonTabla from "../Skeleton/SkeletonTabla"
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import DialogNuevaProfesion from './DialogNuevaProfesion';
import DialogProfesion from './DialogProfesion';
import { apiRoute } from '../Axios/axiosApi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const Profesiones = () => {
  const [cantidad,setCantidad] = useState("0")
  const [flag, setFlag] = useState(false)
  const token = Cookies.get('token');
  const decodedToken = jwtDecode(token);
  const toast = useRef(null);
  const [profesiones, setProfesiones] = useState(undefined)
  const [dialogProfesion, setDialogProfesion] = useState(false);
  const [dialogNuevaProfesion, setDialogNuevaProfesion] = useState(false);
  const [selectedProfesion, setSelectedProfesion] = useState({ profesion: "", descripcion: "" });

  useEffect(() => {
    apiRoute.get('/profesiones',{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data)
      setProfesiones(response.data)
    }).catch(error => {
      console.log(error)
    })
    apiRoute.get('/profesiones/cantidad/obtener',{
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

  const onRowSelect = (event) => {
    console.log(event.value);
    setSelectedProfesion(event.value)
    setDialogProfesion(!dialogProfesion)
  };

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha registrado exitosamente la profesion', life: 3000 });
  }

  const borrar = () => {
    toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha eliminado exitosamente la profesion', life: 3000 });
    setDialogProfesion(!dialogProfesion)
  }

  const editar = () => {
    toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Se ha editado exitosamente la profesion', life: 3000 });
    setDialogProfesion(!dialogProfesion)
  }

  return (
    <div className='flex flex-col w-full mt-8'>
      <Toast ref={toast} position="top-center" />
      <div className='flex flex-col justify-start md:flex-row  md:items-center  md:justify-between md:w-full '>
        <div className='flex flex-row justify-center items-center md:justify-start'>
          <Icon icon="material-symbols:work" className='text-blue300' width="45" />
          <h1 className='ml-4 text-[40px] text-blue300'>Profesiones</h1>
        </div>
        <button className='flex flex-row items-center justify-center  px-4 py-2 text-[18px] text-blue300 bg-white border-[1px] border-blue300 rounded-[10px]' onClick={() => { setDialogNuevaProfesion(!dialogNuevaProfesion) }}> Agregar profesion <Icon icon="mingcute:add-fill" width="20" className='text-blue300 ml-2' /></button>
      </div>
      <h1 className='text-[24px] text-blue500 text-left mb-2'>Cantidad de profesiones: <span className='text-blue200'>{cantidad.count}</span></h1>
      {profesiones === undefined ? <SkeletonTabla /> :
        <DataTable value={profesiones} stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }} selectionMode="single" selection={selectedProfesion} onSelectionChange={onRowSelect}>
          <Column field="profesion" header="Profesion" sortable style={{ width: '25%' }}></Column>
          <Column field="descripcion" header="Descripcion" sortable style={{ width: '75%' }}></Column>
        </DataTable>}
      <DialogProfesion visible={dialogProfesion} setVisible={setDialogProfesion} selectedProfesion={selectedProfesion} borrar={borrar} editar={editar} flag={flag} setFlag={setFlag}/>
      <DialogNuevaProfesion visible={dialogNuevaProfesion} setVisible={setDialogNuevaProfesion} show={showSuccess} flag={flag} setFlag={setFlag}/>
    </div>
  )
}

export default Profesiones