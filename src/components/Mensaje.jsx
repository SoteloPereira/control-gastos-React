
//children recibe todo desde Presupuesto, y tipo indicará si es error o valido
const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>
        {children}
    </div>
  )
}

export default Mensaje
