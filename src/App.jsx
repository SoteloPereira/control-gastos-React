import { useEffect, useState } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
//traemos la funcion para generar id y la pasamos a funciones guardarGasto
import {generarId} from '../src/helpers'
import Filtros from './components/Filtros'

function App() {

  //para guardar los datos de presupuesto, lo guardamos en localStorage y lo obtenemos
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidaPresupuesto, setIsValidPresupuesto] = useState (false)
  const [modal,setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
      //JSON.parse convierte de String a array lo que hay en LS
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const [gastoEditar, setGastoEditar] = useState({})    //para editar un gasto (tipo objeto)
  //para definir el filtro
  const [filtro, setFiltro] = useState('')
  const [filtrados, setFiltrados] = useState([])

  useEffect( ()=>{
    if(Object.keys(gastoEditar).length > 0)
      {
        setModal(true)
        //para que luego de X seg se muestre 
        setTimeout(() => { setAnimarModal(true) }, 300);
      }
  }, [gastoEditar])

  useEffect( ()=>{
      localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect( ()=>{
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) //stringify convierte arreglo a string, para guardarlo en localStorage
  },[gastos])

  useEffect( ()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gts => gts.categoria === filtro)
      setFiltrados(gastosFiltrados)
    }
  },[filtro])

  useEffect( ()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0 )
    console.log(presupuestoLS);
    //si existe un presupuesto en memoria, nos saltamos la pantalla de definir presupuesto
    if(presupuestoLS > 0){
      //cambiando este state a true
        setIsValidPresupuesto(true)
    }
  },[])

  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})
    //para que luego de X seg se muestre 
    setTimeout(() => {

        setAnimarModal(true)

    }, 300);
  }

  const eliminarGasto = (id) =>{
      const gastosVigentes = gastos.filter(g => g.id !== id)
      console.log(gastosVigentes);
      setGastos(gastosVigentes)
  }

  //a diferencia del proyecto agenda, donde del app pasabamos al formulario, ahora sera al reves
  //del Nuevo gasto se lo pasaremos al App
  const guardarGasto = gasto =>{
    if(gasto.id){
        //Actualizamos
        const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
        //guardamos en un nuevo array todo, y el actualizado (gasto), los que no (gastoState) tambien
        setGastos(gastosActualizados)
        setGastoEditar({})
    }
    else{ //Nuevo registro de gasto
        //generamos un id para la key id del objeto
        gasto.id = generarId()  
        //guardamos la fecha cuando se registro el gasto
        gasto.fecha = Date.now()
        //usamos el modificador, le pasamos el array que exista, y le pasamos el nuevo
        setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);

  }

  return (
    // Para corregir que cuando tengamos varios gastos registrados y quedamos agregar otro el modal quede arriba
    // preguntamos si modal esta activo (true) le ponemos la clase fijar a div principal
    <div className={modal ? 'fijar' : ''}>
      <Header 
          gastos = {gastos}
          setGastos = {setGastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidaPresupuesto = {isValidaPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
      />
      
      {/* indicamos que cuando isValidaPresupuesto este como true mostrará el boton */}
      {isValidaPresupuesto && (
        <>
          <main>
          <Filtros
            filtro = {filtro}
            setFiltro = {setFiltro}
          />
            <ListadoGastos 
                gastos = {gastos}
                setGastoEditar = {setGastoEditar}
                eliminarGasto = {eliminarGasto}
                filtro = { filtro}
                filtrados = {filtrados}
            />
          </main>
          <div className='nuevo-gasto'>
            {/* poner en {} cuando usamos variables */}
              <img src={IconoNuevoGasto} alt="icono nuevo gasto"
              //evento que dispara el modal para agregar un gasto
              onClick={handleNuevoGasto}/>
          </div>
        </>
      )}

      {modal && <Modal 
                setModal= {setModal}
                animarModal = {animarModal}
                setAnimarModal= {setAnimarModal}
                guardarGasto = {guardarGasto}
                gastoEditar = {gastoEditar}
                setGastoEditar = {setGastoEditar}
                />}
    </div>
  )

}

export default App
