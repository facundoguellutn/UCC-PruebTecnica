import React from 'react'
import { styles } from '../styles'
import Users from "../components/Usuarios/Users"
import Profesiones from '../components/Profesiones/Profesiones'
import Info from '../components/Info/Info'


const Usuarios = () => {
  return (
    <div className={styles.screenUsers}>
      <Users />
      <Profesiones />
      <Info />

    </div>
  )
}

export default Usuarios