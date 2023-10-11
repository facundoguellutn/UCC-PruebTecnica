import React from 'react'
import { styles } from '../styles'
import Users from "../components/Usuarios/Users"

const Usuarios = () => {
  return (
    <div className={styles.screenUsers}>
      <Users />
    </div>
  )
}

export default Usuarios