import { isValidElement, useEffect, useState } from "react"
import { CircularProgressbar  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState (0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect( ()=>{

        const totalGastado = gastos.reduce( (total, g) => g.cantidadGasto + total, 0)
        //modificamos el valor de gastado, y lo mostramos en el p de return
        setGastado(totalGastado)
        //varible para usar en modificador
        const totalDisponible = presupuesto - totalGastado
        setDisponible(totalDisponible)
        //Calculo de % para circulo de progreso
        const calcularPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        //para demorar la visualizacion del avance de la barra
        setTimeout(() => {
            setPorcentaje(calcularPorcentaje)
        }, 1000);
        
    }, [gastos]) //cada vez que el array de gastos cambie, se ejecutará

    const formatearValor = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style:'currency', 
            currency: 'USD'
        })
    }

    const handleResetApp = () =>{
        const respuestaReset = confirm("¿Seguro que desea reiniciar?")
        if(respuestaReset){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}% gastado`}
                
            />
        </div>
        <div className="contenido-presupuesto">
            <button className="reset-app" onClick={handleResetApp}>
                    Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearValor(presupuesto)}
            </p>
            <p className={disponible < 0 ? 'negativo' : ''}>
                <span>Disponible: </span>{formatearValor(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearValor(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
