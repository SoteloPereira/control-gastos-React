import Gasto from "./Gasto"


const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, filtrados}) => {
    console.log(gastos);
  return (
    <div className="contenedor listado-gastos">
                {/* si existe un filtro, iteramos sobre el array ya filtrado, si no, mostramos todo */}

                { filtro ? (
                    <>
                        <h2>{filtrados.length ? 'Gastos' : 'No hay gastos registrados'}</h2>
                        {
                            filtrados.map(gastoDetalle => (
                                <Gasto 
                                    key = {gastoDetalle.id}
                                    gastoDetalle = {gastoDetalle}
                                    setGastoEditar = {setGastoEditar}
                                    eliminarGasto = {eliminarGasto}
                                />
                                )
                            )
                        }
                    </>
                ) :
                (
                    <>
                    <h2>{gastos.length ? 'Gastos' : 'No hay gastos registrados'}</h2>
                    {
                        gastos.map(gastoDetalle => (
                            <Gasto 
                                key = {gastoDetalle.id}
                                gastoDetalle = {gastoDetalle}
                                setGastoEditar = {setGastoEditar}
                                eliminarGasto = {eliminarGasto}
                            />
                            )
                        )
                    }
                    </>
                )   
                } 
    </div>
  )
}

export default ListadoGastos
