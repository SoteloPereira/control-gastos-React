//aqui tenemos las funciones generales que se usan en un programa

export const generarId= () =>{
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}
//le pasamos la fecha declarada con date.now() en el objeto, para que la transforme
export const generarFecha = (fecha) =>{
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleString('es-ES', opciones)
}

