import ControlPresupuesto from "./ControlPresupuesto"
import Presupuesto from "./Presupuesto"

const Header = ({presupuesto, 
                setPresupuesto,
                isValidaPresupuesto, 
                setIsValidPresupuesto,
                gastos,
                setGastos}) => {
  return (
    <header >
        <h1>Planificador de gastos</h1>

        {/* ya se valida el presupuesto en Presupuesto, nos cambia a true el state */}
        {isValidaPresupuesto ? 
                
            <ControlPresupuesto
                gastos = {gastos}
                presupuesto = {presupuesto}
                setGastos = {setGastos}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
            :
            <Presupuesto 
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        }
       
    </header>
  )
}

export default Header
