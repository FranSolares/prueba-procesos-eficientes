import React from 'react'
import NavBar from './NavBar/NavBar'

import './Layout.scss'

const Layout = (props) => {
    return (
        <div className='container'>
            <NavBar />
            {props.children}
        </div>
    )
}

export default Layout;
