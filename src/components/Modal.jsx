import { useEffect, useState } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar,setGastoEditar} ) => {

    //creamos los state para cada campo, y debemos sincronizarlo agregando el value en el input
    const [gasto,setGasto] = useState('')
    const [cantidadGasto, setCantidadGasto] = useState('')
    const [categoria, setCategoria] = useState('')
    //para validar los datos de nuevo gasto
    const [mensaje,setMensaje] = useState('')
    //para cuando se edita un registro, usamos el id y actualizamos fecha
    const [fecha, setFecha] = useState()
    const [id, setId] = useState('')

    useEffect( () => {
        //si es > 0 ya existe, por tanto cargamos los valores del objeto gastoEditar
        if(Object.keys(gastoEditar).length > 0){
            setGasto(gastoEditar.gasto)
            setCantidadGasto(gastoEditar.cantidadGasto)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[]) 

    const handleCerrarModal = () =>{
        //para que al cerrar el modal, pueda tener la transicion de nuevo (false)
        setAnimarModal(false)
        setGastoEditar({})
        //para darle animacion al cierre
        setTimeout(() => {
            setModal(false)
        }, 300);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if([gasto,cantidadGasto,categoria].includes('')){
            setMensaje("Debe completar todos los campos");
            return
        }
        //si pasamos la validacion, la llamamos pasandole los valores como objeto
        guardarGasto({gasto, cantidadGasto, categoria, id, fecha}) //esta en App
        handleCerrarModal()
    }

    const setearMensaje = () =>{
        setMensaje('')
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarModal} alt="boton cerrar" 
                onClick={handleCerrarModal}/>
        </div>
            
            <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSumbit}>

                <legend>{gastoEditar.gasto ? 'Editar gasto' : 'Nuevo Gasto'}</legend>

                <div className='campo'>
                    <label  htmlFor="nombreGasto">Nombre Gasto</label>
                    <input type="text" id="nombreGasto" placeholder='Añade el nombre del gasto'
                        value={gasto}
                        onChange={e => {setGasto(e.target.value)
                            setearMensaje()
                        }}/>
                </div>    
                <div className='campo'>
                    <label htmlFor="cantidadGasto">Cantidad</label>
                    <input type="number" id="cantidadGasto" placeholder='Añade la cantidad del gasto ej: 300'
                    value={cantidadGasto}
                    onChange={e => {setCantidadGasto(Number(e.target.value))
                        setearMensaje()
                    }}/>
                </div>
                <div className='campo'>
                    <label htmlFor="categoriaGasto">Categoría Gasto</label>
                    <select name="" id="categoriaGasto"
                    value={categoria}
                    onChange={e => {setCategoria(e.target.value)
                        setearMensaje()
                    }}>
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastosVarios">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="plataformas">Plataformas</option>
                    </select>
                </div>
                    <input type="submit" value={gastoEditar.gasto ? 'Editar registro' : 'Añadir gasto'}/>
                    {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            </form>
            
    </div>
   
  )
 
}

export default Modal
