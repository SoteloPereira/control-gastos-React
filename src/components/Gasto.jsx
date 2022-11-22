import React from "react"
//importamos esta librerias para hacer el efecto de swipe de los gastos para modificar o eliminarlos
//deben rodear el elemento que tendran el efecto
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import {generarFecha} from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoPlataformas from '../img/icono_suscripciones.svg'

const diccionario ={
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastosVarios: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    plataformas: IconoPlataformas
}

const Gasto = ({gastoDetalle, setGastoEditar, eliminarGasto}) => {

    const {gasto,cantidadGasto,categoria, id, fecha} = gastoDetalle

    //cambiamos las llaves {} de la fn por () para indicar que hay un return (de un componente)
    const leadingActions = ()=> (
        <LeadingActions>
            {/* obligatorio pasarle el onClick - modificador debe recibir el objeto (gastoDetalle)*/}
            <SwipeAction onClick={ () => setGastoEditar(gastoDetalle)}> 
                    Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    const trailingActions = ()=> (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(gastoDetalle.id)}
            destructive={true}>
                Borrar
            </SwipeAction>
        </TrailingActions>
        
    )
    //como el array de gastos esta en App, se debe declarar alla para hacer un filter
    

  return (

    <SwipeableList>
        {/* le pasamos 2 props (fnciones que llamamos), leading es lo que va adelante y trailing al final */}
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="gasto sombra">
                <div className="contenido-gasto">
                    <img 
                        src={diccionario[categoria]} alt="icono categoria" 
                    /> 
                    <div className="descripcion-gasto">
                        <p className="categoria">{categoria}</p>
                        <p className="nombre-gasto">{gasto}</p>
                    
                        <p className="fecha-gasto">Agregado el: {""}
                            <span>{generarFecha(fecha)}</span>
                        </p>   
                    </div>
                
                </div>
                {/* se deja aqui, porque el div gasto tiene un justify content que los alinea asi  */}
                <p className="cantidad-gasto">${cantidadGasto}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
