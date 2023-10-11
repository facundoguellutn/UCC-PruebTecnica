import React from 'react'
import { styles } from '../styles'
import Users from "../components/Usuarios/Users"
import Profesiones from '../components/Profesiones/Profesiones'

const Usuarios = () => {
  return (
    <div className={styles.screenUsers}>
      <Users />
      <Profesiones />
    </div>
  )
}

export default Usuarios