import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './Vehicles.scss'

const VehiclesPage = () => {
    const [data, setData] = useState(null) //En la variable data se almacenara toda la información que me devuelve la API.
    const [loading, setLoading] = useState(false) //En la variable loading se almacena un boolean que servira para ejecutar ciertos eventos o componentes.
    const [row, setRow] = useState(null) //En la variable row se almacenara la fila que se modificará o eliminará dentro de la tabla.
    const [option, setOption] = useState({ method: '', title: '' }) //En la  variable option se almacena un objeto que contiene el metodo a ejecutar, ejemplo un INSERT o UPDATE, y un title que servirá para un componente más adelante
    const [status, setStatus] = useState(null) //En la variable status se almacenan todos los estados que puede tener un vehiculo, los cuales trae de la API
    const [idVehicle, setIdVehicle] = useState() //En la variable idVehicle se almacena el id de la fila que se va a editar, insertar o eliminar.
    const { register, errors, handleSubmit, setValue, clearErrors } = useForm({
        mode: 'onChange',
    }) //Hook que maneja el uso de formularios en ReactJs.
    const token = window.localStorage.getItem('PE_PruebaAuth') //Se obtiene el token de desde el local storage.

    //Trae todos los vehiculos desde la API y los almacena en la variable data.
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    'http://127.0.0.1:3500/vehicles/select',
                    {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    }
                )
                const message = await response.json()
                if (response.status === 200) {
                    setData(message.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    alert(
                        'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                    )
                }
            } catch (err) {
                setLoading(false)
                alert(
                    'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                )
            }
        }

        fetchData()
    }, [token])

    //Trae los estados de los vehiculos y los almacena en la variable status, que luego se utilizan para crear un select con estos valores
    useEffect(() => {
        const fetchStates = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    'http://127.0.0.1:3500/states/select',
                    {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    }
                )
                const message = await response.json()
                if (response.status === 200) {
                    setLoading(false)
                    setStatus(message.data)
                } else {
                    setLoading(false)
                    console.log(message)
                    alert(
                        'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                    )
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
                alert(
                    'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                )
            }
        }

        fetchStates()
    }, [token])

    const openVehicleModal = () => {
        let vehicleModal = document.getElementById('vehicles-modal')
        vehicleModal.style.left = '0%'
        vehicleModal.style.width = '100%'
    }

    const closeVehicleModal = () => {
        let vehicleModal = document.getElementById('vehicles-modal')
        vehicleModal.style.left = '100%'
        vehicleModal.style.width = '0%'
        setOption({ method: '', title: '' })
        setValue('vehicle_brand', '')
        setValue('vehicle_model', '')
        setValue('vehicle_year', '')
        setValue('vehicle_plate', '')
        setValue('vehicle_state', '')
        setIdVehicle('')
        clearErrors()
    }

    const handleMethodSubmit = async (data) => {
        switch (option.method) {
            case 'INSERT':
                try {
                    setLoading(true)
                    const response = await fetch(
                        'http://127.0.0.1:3500/vehicles/insert',
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                            body: JSON.stringify(data),
                        }
                    )
                    const res = await response.json()
                    if (response.status === 200) {
                        const table = document.getElementById('vehicles')
                        const newRow = table.insertRow()
                        const idCell = newRow.insertCell(0)
                        const brandCell = newRow.insertCell(1)
                        const modelCell = newRow.insertCell(2)
                        const yearCell = newRow.insertCell(3)
                        const plateCell = newRow.insertCell(4)
                        const stateCell = newRow.insertCell(5)
                        const state = status.find(
                            (state) =>
                                state.idState === parseInt(data.vehicle_state)
                        )
                        idCell.innerText = res.insertedID
                        brandCell.innerText = data.vehicle_brand
                        modelCell.innerText = data.vehicle_model
                        yearCell.innerText = data.vehicle_year
                        plateCell.innerText = data.vehicle_plate
                        stateCell.innerText = state.state_name
                        closeVehicleModal()
                        setLoading(false)
                    } else if (response.status === 401) {
                        setLoading(false)
                        alert('No tienes permiso para realizar esta acción')
                    } else {
                        setLoading(false)
                        alert(
                            'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                        )
                    }
                } catch (err) {
                    setLoading(false)
                    alert(
                        'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                    )
                    console.log(err)
                }
                break

            case 'UPDATE':
                try {
                    setLoading(true)
                    data.vehicle_id = idVehicle
                    const response = await fetch(
                        'http://127.0.0.1:3500/vehicles/update',
                        {
                            method: 'PUT',
                            mode: 'cors',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                            body: JSON.stringify(data),
                        }
                    )
                    if (response.status === 200) {
                        const tableCells = document.getElementById('vehicles').rows[row].cells
                        const state = status.find(
                            (state) =>
                                state.idState === parseInt(data.vehicle_state)
                        )
                        tableCells[0].innerText =  data.vehicle_id
                        tableCells[1].innerText = data.vehicle_brand
                        tableCells[2].innerText = data.vehicle_model
                        tableCells[3].innerText = data.vehicle_year
                        tableCells[4].innerText = data.vehicle_plate
                        tableCells[5].innerText = state.state_name
                        closeVehicleModal()
                        setLoading(false)
                    } else if (response.status === 401) {
                        setLoading(false)
                        alert('No tienes permiso para realizar esta acción')
                    } else {
                        setLoading(false)
                        alert(
                            'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                        )
                    }
                } catch (err) {
                    setLoading(false)
                    alert(
                        'Ha ocurrido un error, por favor inténtelo de nuevo más tarde 2'
                    )
                }
                break

            default:
                console.log('DEFAULT')
                break
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                'http://127.0.0.1:3500/vehicles/delete',
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({ vehicle_id: idVehicle }),
                }
            )
            if (response.status === 200) {
                const table = document.getElementById('vehicles')
                table.deleteRow(row)
                closeVehicleModal()
                setLoading(false)
            } else if (response.status === 401) {
                setLoading(false)
                alert('No tienes permiso para realizar esta acción')
            } else {
                setLoading(false)
                alert(
                    'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
                )
            }
        } catch (err) {
            setLoading(false)
            alert(
                'Ha ocurrido un error, por favor inténtelo de nuevo más tarde'
            )
        }
    }

    return (
        <React.Fragment>
            {loading && <div className="loading-progress"></div>}
            <table className="vehicles-table" id="vehicles">
                <thead>
                    <tr className="row-header">
                        <th key="idVehicle" className="table-headers">
                            ID
                        </th>
                        <th key="vehicle_brand" className="table-headers">
                            Marca
                        </th>
                        <th key="vehicle_model" className="table-headers">
                            Modelo
                        </th>
                        <th key="vehicle_year" className="table-headers">
                            Año
                        </th>
                        <th key="vehicle_plate" className="table-headers">
                            Placa
                        </th>
                        <th key="state_name" className="table-headers">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data !== null && data.length > 0 ? (
                        data.map((value, key) => {
                            return (
                                <tr
                                    key={value.idVehicle}
                                    className="table-row"
                                    onClick={(e) => {
                                        const tableRow = e.currentTarget
                                        const state = status.find(
                                            (state) =>
                                                state.state_name === tableRow.cells[5].innerText
                                        )
                                        setOption({
                                            method: 'UPDATE',
                                            title: 'Actualizar datos',
                                        })
                                        setValue(
                                            'vehicle_brand',
                                            tableRow.cells[1].innerText
                                        )
                                        setValue(
                                            'vehicle_model',
                                            tableRow.cells[2].innerText
                                        )
                                        setValue(
                                            'vehicle_year',
                                            tableRow.cells[3].innerText
                                        )
                                        setValue(
                                            'vehicle_plate',
                                            tableRow.cells[4].innerText
                                        )
                                        setValue(
                                            'vehicle_state',
                                            state.idState
                                        )
                                        setIdVehicle(value.idVehicle)
                                        setRow(tableRow.rowIndex)
                                        openVehicleModal()
                                    }}
                                >
                                    <td className="table-data">
                                        {value.idVehicle}
                                    </td>
                                    <td className="table-data">
                                        {value.vehicle_brand}
                                    </td>
                                    <td className="table-data">
                                        {value.vehicle_model}
                                    </td>
                                    <td className="table-data">
                                        {value.vehicle_year}
                                    </td>
                                    <td className="table-data">
                                        {value.vehicle_plate}
                                    </td>
                                    <td className="table-data">
                                        {value.state_name}
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="table-row">
                            <td className="table-data" colSpan="5">
                                No hay datos
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                className="button-add"
                onClick={() => {
                    setOption({ method: 'INSERT', title: 'Ingresar datos' })
                    openVehicleModal()
                }}
            >
                +
            </button>

            <div id="vehicles-modal">
                <form
                    className="vehicle-form"
                    onSubmit={handleSubmit(handleMethodSubmit)}
                >
                    <h1>{option.title}</h1>
                    <input
                        type="text"
                        placeholder="Marca..."
                        name="vehicle_brand"
                        id="brand"
                        ref={register({ required: true })}
                        className="input-text"
                    />
                    {errors.vehicle_brand && (
                        <p className="error-message">
                            Ingrese la marca del vehículo
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Modelo..."
                        name="vehicle_model"
                        id="model"
                        ref={register({ required: true })}
                        className="input-text"
                    />
                    {errors.vehicle_model && (
                        <p className="error-message">
                            Ingrese el modelo del vehículo
                        </p>
                    )}

                    <input
                        type="text"
                        placeholder="Año..."
                        name="vehicle_year"
                        id="year"
                        ref={register({
                            required: true,
                            pattern: /^[0-9]*$/g,
                        })}
                        className="input-text"
                    />
                    {errors.vehicle_year?.type === 'required' && (
                        <p className="error-message">
                            Ingrese el año del vehículo
                        </p>
                    )}
                    {errors.vehicle_year?.type === 'pattern' && (
                        <p className="error-message">
                            Ingrese un año valido
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Placa..."
                        name="vehicle_plate"
                        id="plate"
                        maxLength="8"
                        ref={register({
                            required: true,
                            pattern: /[A-Z](-)[A-Z]{3}[0-9]{3}/g,
                            maxLength: '8',
                        })}
                        className="input-text"
                    />
                    {errors.vehicle_plate?.type === 'required' && (
                        <p className="error-message">
                            Ingrese la placa del vehículo{' '}
                        </p>
                    )}
                    {errors.vehicle_plate?.type === 'pattern' && (
                        <p className="error-message">
                            Placa del vehículo no válida{' '}
                        </p>
                    )}
                    {errors.vehicle_plate?.type === 'maxLength' && (
                        <p className="error-message">
                            Placa del vehículo no válida{' '}
                        </p>
                    )}
                    <div className="select-container">
                        <label htmlFor="vehicle_state">Estado</label>
                        <select
                            className="select-state"
                            name="vehicle_state"
                            ref={register({ required: true })}
                            id="state"
                        >
                            {status !== null && status.length > 0 ? (
                                status.map((value, key) => (
                                    <option
                                        key={key}
                                        value={value.idState}
                                        className="option-select"
                                    >
                                        {value.state_name}
                                    </option>
                                ))
                            ) : (
                                <option key={1} disabled>
                                    No hay datos
                                </option>
                            )}
                        </select>
                    </div>
                    {errors.vehicle_state && (
                        <p className="error-message">Selecciona un estado</p>
                    )}
                    <div className="buttons-container">
                        {option.method === 'UPDATE' && (
                            <input
                                type="button"
                                value="Delete"
                                className="delete-button"
                                onClick={handleDelete}
                            />
                        )}
                        <input
                            type="button"
                            value="Cancelar"
                            className="cancel-button"
                            onClick={closeVehicleModal}
                        />
                        <input
                            type="submit"
                            value={
                                option.method === 'UPDATE'
                                    ? 'Actualizar'
                                    : 'Insertar'
                            }
                            className="insert-button"
                        />
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default VehiclesPage
