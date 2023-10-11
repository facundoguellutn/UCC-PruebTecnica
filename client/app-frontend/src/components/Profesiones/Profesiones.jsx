import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react';
import { DataTable } from 'primereact/datatable';
import SkeletonTabla from "../Skeleton/SkeletonTabla"
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';


const Profesiones = () => {
  const toast = useRef(null);
  const [profesiones, setProfesiones] = useState(undefined)
  const [dialogProfesion, setDialogProfesion] = useState(false);
  const [dialogNuevaProfesion, setDialogNuevaProfesion] = useState(false);
  const [selectedProfesion, setSelectedProfesion] = useState({ profesion: "", descripcion: "" });
 
  useEffect(() => {
    setTimeout(() => {
      setProfesiones([
        { profesion: "Ingeniero de Software", descripcion: "Diseña y desarrolla software." },
        { profesion: "Médico", descripcion: "Trata a pacientes y realiza diagnósticos médicos." },
        { profesion: "Abogado", descripcion: "Brinda asesoramiento legal y representa a clientes en casos legales." },
        { profesion: "Profesor", descripcion: "Imparte conocimientos y educa a estudiantes." },
        { profesion: "Diseñador Gráfico", descripcion: "Crea diseños visuales y gráficos." },
        { profesion: "Chef", descripcion: "Prepara platos de comida deliciosos." },
        { profesion: "Enfermero/a", descripcion: "Brinda cuidados médicos y apoyo a pacientes." },
        { profesion: "Ingeniero Civil", descripcion: "Diseña y supervisa proyectos de construcción." },
        { profesion: "Psicólogo", descripcion: "Ofrece terapia y asesoramiento emocional." },
        { profesion: "Contador", descripcion: "Gestiona las finanzas y contabilidad de empresas." },
        { profesion: "Arquitecto", descripcion: "Diseña y planifica edificios y estructuras." },
        { profesion: "Electricista", descripcion: "Trabaja en sistemas eléctricos y cableado." },
        { profesion: "Escritor", descripcion: "Crea contenido escrito, como libros y artículos." },
        { profesion: "Fotógrafo", descripcion: "Captura imágenes fotográficas." },
        { profesion: "Piloto", descripcion: "Opera aeronaves y realiza vuelos." }
      ])
    }, 2000);
  }, [])

  const onRowSelect = (event) => {
    console.log(event.value);
    setSelectedProfesion(event.value)
};
 
  return (
    <div className='flex flex-col w-full mt-8'>
            <Toast ref={toast} position="top-center" />
            <div className='flex flex-col justify-start md:flex-row  md:items-center  md:justify-between md:w-full '>
                <div className='flex flex-row justify-center items-center md:justify-start'>
                    <Icon icon="mdi:users" className='text-blue300' width="50" />
                    <h1 className='ml-4 text-[40px] text-blue300'>Profesiones</h1>
                </div>
                <button className='flex flex-row items-center justify-center  px-4 py-2 text-[18px] text-blue300 bg-white border-[1px] border-blue300 rounded-[10px]' onClick={() => { setDialogNuevaProfesion(!dialogNuevaProfesion) }}> Agregar profesion <Icon icon="mingcute:add-fill" width="20" className='text-blue300 ml-2' /></button>
            </div>
            <h1 className='text-[24px] text-blue500 text-left mb-2'>Cantidad de profesiones: <span className='text-blue200'>24</span></h1>
            {profesiones === undefined ? <SkeletonTabla /> :
                <DataTable value={profesiones} stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }} selectionMode="single" selection={selectedProfesion} onSelectionChange={onRowSelect}>
                    <Column field="profesion" header="Profesion" sortable style={{ width: '25%' }}></Column>
                    <Column field="descripcion" header="Descripcion" sortable style={{ width: '75%' }}></Column>
                </DataTable>}
        </div>
  )
}

export default Profesiones