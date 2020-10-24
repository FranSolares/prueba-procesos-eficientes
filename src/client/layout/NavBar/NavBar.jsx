import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = (props) => {

    const handleSession = () => {
        window.localStorage.removeItem('PE_PruebaAuth')
    } 

    return(
        <div className='navbar'>
            <NavLink to='/vehicles' className='nav-link'>Vehículos</NavLink>
            <NavLink to='#' onClick={handleSession} className='nav-link' >Cerrar Sesión</NavLink>
        </div>
    )
}

export default NavBar
