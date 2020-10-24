import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...rest }) => {

  const handleRender = (props) => {
    if (window.localStorage.getItem('PE_PruebaAuth') === null) {
        return <Component {...props} />
    }
    return <Redirect to="/vehicles" />
  }

  return <Route render={handleRender} {...rest} />

}

export default AuthRoute
