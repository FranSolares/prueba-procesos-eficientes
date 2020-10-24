import React from 'react'
import { useHistory } from 'react-router-dom'
import './NotFound.scss'

const NotFoundPage = () => {

  const history = useHistory()

  return (
    <div className="error-page-container">
      <h1 className='error-message'> Error 404 Not Found</h1>
      <input className='button' type="button" value="Go Back" onClick={() => {history.goBack()}} />
    </div> 
  )
}

export default NotFoundPage
