import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './Register.scss'

const RegisterPage = () => {

    const {register, errors, handleSubmit} = useForm({ mode: 'onChange' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()

    const handleRegister = async (data) => {
        try {
            setLoading(true)
            const response = await fetch('http://127.0.0.1:3500/user/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const message = await response.json()
            console.log(message)
            if (response.status === 200) {
                window.localStorage.setItem('PE_PruebaAuth', message.token)
                history.push('/vehicles')
            } else if (response.status === 400){
                setLoading(false)
                setError('Nombre de usuario ya existente')
            } else {
                setLoading(false)
                setError('Ha ocurrido un error, por favor inténtelo de nuevo más tarde')
            }
        } catch (err) {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            {loading && <div className='loading-progress'></div>}
            <div className='register-page-container'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit(handleRegister)} className='register-form'>
                        <h1>Registrar</h1>
                        <input type="text" placeholder='Username...' name="username" id="username" ref={register({required: true})} className='input-text'/>
                        {errors.username && <p className='error-message'>Ingrese un usuario</p>}
                        <input type="password" placeholder='Password...' name="password" id="password" ref={register({required: true})} className='input-text' />
                        {errors.password && <p className='error-message'>Ingrese una contraseña</p>}
                        <input type="submit" value="Crear cuenta" className='button-primary' />
                        <input type="button" value="Cancelar" className='button-secondary' onClick={() => {history.goBack()}} />
                        {error && <p className='error-message-login'>{error}</p>}
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RegisterPage
