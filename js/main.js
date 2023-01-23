
function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador) 
    
}

function seleccionarMascotaJugador() {
    let hipodoge = document.getElementById('hipodoge')
    let capipepo = document.getElementById('capipepo')
    let ratigueya = document.getElementById('ratigueya')
    if(hipodoge.checked === true){
        alert('SELECCIONASTE: '+ hipodoge.id)
    } else if (capipepo.checked === true){
        alert('SELECCIONASTE: '+ capipepo.id)
    } else if (ratigueya.checked === true){
        alert('SELECCIONASTE: '+ ratigueya.id)
    } else {
        alert('SELECCIONA UNA MASCOTA')
    }
    
}

//La etiqueta SCRIPT que está en la etiqueta HEAD del HTML necesita que primero se cargue 
window.addEventListener('load', iniciarJuego)

