let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;


function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';
    let sectionReiniciarJuego = document.getElementById('reiniciar');
    sectionReiniciarJuego.style.display = 'none';
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonAtaqueFuego = document.getElementById('boton-fuego');
    botonAtaqueFuego.addEventListener('click', ataqueFuego);
    let botonAtaqueAgua = document.getElementById('boton-agua');
    botonAtaqueAgua.addEventListener('click', ataqueAgua);
    let botonAtaqueTierra = document.getElementById('boton-tierra');
    botonAtaqueTierra.addEventListener('click', ataqueTierra);  
    let botonReiniciarJuego = document.getElementById('boton-reiniciar');
    botonReiniciarJuego.addEventListener('click', reiniciarJuego);
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
    
    combate();
}
function combate (){
  let spanVidasJugador = document.getElementById('vidas-jugador');
  let spanVidasEnemigo = document.getElementById('vidas-enemigo'); 
  
  if (ataqueJugador == ataqueEnemigo ){
    crearMensaje('Empate 🙃');       
  } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
    vidasEnemigo--; //descontamos a la variable una unidad
    spanVidasEnemigo.innerHTML = vidasEnemigo; //considerar que aquí siempre va la cantidad final a mostrar
    crearMensaje('Ganaste 🥳');
    
  } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje('Ganaste 🥳');
    
  } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){  
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje('Ganaste 🥳');
    
  } else {   
    vidasJugador--
    spanVidasJugador.innerHTML = vidasJugador;
    crearMensaje('Perdiste 😥');  
    
  }
  
  revisarVidas()
}

function revisarVidas() {
    if(vidasEnemigo == 0){
        crearMensajeFinal('GANASTE 🎉');

    } else if (vidasJugador == 0){
        crearMensajeFinal('PERDISTE 😭');
    }
    
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= 'Hipodoge';
        sectionSeleccionarMascota.style.display = 'none';
        
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML= 'Capipepo';
        sectionSeleccionarMascota.style.display = 'none';
        
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML= 'Ratigueya';
        sectionSeleccionarMascota.style.display = 'none';
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

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('mostrar-mensajes');
    let mensajes = document.createElement('p');
    mensajes.innerHTML =  'Tu mascota atacó '+ ataqueJugador + ', la mascota del enemigo atacó con '+ ataqueEnemigo + ' - ' + resultado;
    sectionMensajes.appendChild(mensajes);
}

function crearMensajeFinal(resultadoFinal){
   
    let sectionMensajes = document.getElementById('mostrar-mensajes');
    let mensajes = document.createElement('p');
    mensajes.innerHTML =  resultadoFinal;
    sectionMensajes.appendChild(mensajes);

    let botonAtaqueFuego = document.getElementById('boton-fuego');
    botonAtaqueFuego.disabled = true;
    let botonAtaqueAgua = document.getElementById('boton-agua');
    botonAtaqueAgua.disabled = true;
    let botonAtaqueTierra = document.getElementById('boton-tierra');
    botonAtaqueTierra.disabled = true;
    
    let sectionReiniciarJuego = document.getElementById('reiniciar');
    sectionReiniciarJuego.style.display = 'block';
}
function reiniciarJuego(){
    location.reload();
}
function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min +1)+min)

}

//La etiqueta SCRIPT que está en la etiqueta HEAD del HTML necesita que primero se cargue 
window.addEventListener('load', iniciarJuego);

