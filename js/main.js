let ataqueJugador;
let ataqueEnemigo;

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonAtaqueFuego = document. getElementById('boton-fuego');
    botonAtaqueFuego.addEventListener('click', ataqueFuego);
    let botonAtaqueAgua = document. getElementById('boton-agua');
    botonAtaqueAgua.addEventListener('click', ataqueAgua);
    let botonAtaqueTierra = document. getElementById('boton-tierra');
    botonAtaqueTierra.addEventListener('click', ataqueTierra);    
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO';     
    ataqueEnemigoAleatorio();
}

function ataqueAgua(){    
    ataqueJugador = 'AGUA'; 
    ataqueEnemigoAleatorio();
}

function ataqueTierra(){    
    ataqueJugador = 'TIERRA';    
    ataqueEnemigoAleatorio();
}

function ataqueEnemigoAleatorio(){
    let ataqueAleatorio = aleatorio(1,3);
    
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO';
              
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA';
        
    } else {
        ataqueEnemigo = 'TIERRA';
        
    }

    crearMensaje();
}

function crearMensaje(){
    let sectionMensajes = document.getElementById('mostrar-mensajes');
    let mensajes = document.createElement('p');
    mensajes.innerHTML =  'Tu mascota atacó '+ ataqueJugador + ', la mascota del enemigo atacó con '+ ataqueEnemigo + ' Estado: Pendiente';
    sectionMensajes.appendChild(mensajes);
}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= 'Hipodoge';
        
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML= 'Capipepo';
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML= 'Ratigueya';
    } else {
        alert('SELECCIONA UNA MASCOTA');
    }
    seleccionarMascotaEnemigo();

}
function seleccionarMascotaEnemigo(){
    let mascotaEnemigoAleatorio = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if(mascotaEnemigoAleatorio == 1){
        spanMascotaEnemigo.innerHTML= 'Hipodoge';
        
    } else if (mascotaEnemigoAleatorio == 2){
        spanMascotaEnemigo.innerHTML= 'Capipepo';
    } else {
        spanMascotaEnemigo.innerHTML= 'Ratigueya';
    }
         

}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min +1)+min)

}


//La etiqueta SCRIPT que está en la etiqueta HEAD del HTML necesita que primero se cargue 
window.addEventListener('load', iniciarJuego);

