import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../layout'

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const handleRender = (props) => {
    if (window.localStorage.getItem('PE_PruebaAuth') !== null) {
        return <Layout><Component {...props} /></Layout>
    }
    return <Redirect to="/" />
  }

  return <Route render={handleRender} {...rest} />
}

export default ProtectedRoute
