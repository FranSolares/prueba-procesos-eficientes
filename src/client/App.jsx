import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './screens/LoginPage/Login'
import RegisterPage from './screens/RegisterPage/Register'
import AuthRoute from './routes/AuthRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import VehiclesPage from './screens/VehiclesPage/Vehicles'
import NotFoundPage from './screens/NotFoundPage/NotFound'
import './global/Global.scss'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute exact={true} path="/" component={LoginPage} />
                <AuthRoute
                    exact={true}
                    path="/register"
                    component={RegisterPage}
                />
                <ProtectedRoute
                    exact={true}
                    path="/vehicles"
                    component={VehiclesPage}
                />
                <Route exact={true} path="*" component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
