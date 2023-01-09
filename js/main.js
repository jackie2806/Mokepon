
function iniciarJuego(){    
    let botonMascotaJugador = document.getElementById('boton-mascota')  
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    alert('SELECCIONASTE TU MASCOTA')
}
//La etiqueta script que está en la etiqueta <head></head> del HTML necesita que primero se cargue 
window.addEventListener('load', iniciarJuego)