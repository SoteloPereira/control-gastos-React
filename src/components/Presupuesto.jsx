import { useState } from "react";
import Mensaje from "./Mensaje";

const Presupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    //para enviar el texto al componente Mensaje
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        //console.log(Number(presupuesto)); //se mostrara azul en consola, la ser number

        //hacemos la validacion de que sea number con el type del input y el Number en el onChange
        if(!presupuesto || presupuesto < 0){
            //modificamos el valor de mensaje para enviarlo al componente
            setMensaje("No es un presupuesto valido");
            //cortamos el ciclo y sale de la funcion, si no, sigue el codigo abajo
            return
        }
        // Limpiamos el mensaje luego de que ya haya ingresado algo mal
        setMensaje('')
        //si el presupuesto es valido, cambiará a true el state, y en Mensaje lo manda al otro componente
        setIsValidPresupuesto(true)
}

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario">
            <div className="campo">
                <label>
                    Definir presupuesto
                </label>
                {/* Estaba en type text y hicimos validaciones en el if, lo psamos a number en onchange y aca y se valida */}
                <input type="number" className="nuevo-presupuesto" placeholder="Añade tu presupuesto"
                value={presupuesto}
                //lo convertimos a numero para evitar inconvenientes
                onChange={ e => {setPresupuesto(Number(e.target.value))
                        setMensaje('')
                }}
                />
                <input type="submit"
                onClick={handlePresupuesto} />
                {/* le pasamos al componente Mensaje, el children (debe tener apertura y cierre) que tiene el texto del mensaje
                con el error, y por props le pasamos el tipo para darle formato con la clase "alerta error" */}
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            </div>
        </form>
    </div>
  )
}

export default Presupuesto
