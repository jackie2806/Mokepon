
function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= 'Hipodoge';
        
    } else if (inputCapipepo.checked === true){
        spanMascotaJugador.innerHTML= 'Capipepo'
    } else if (inputRatigueya.checked === true){
        spanMascotaJugador.innerHTML= 'Ratigueya'
    } else {
        alert('SELECCIONA UNA MASCOTA')
    }
    
}

//La etiqueta SCRIPT que está en la etiqueta HEAD del HTML necesita que primero se cargue 
window.addEventListener('load', iniciarJuego)

