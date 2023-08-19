const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciarJuego = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonAtaqueFuego = document.getElementById("boton-fuego");
const botonAtaqueAgua = document.getElementById("boton-agua");
const botonAtaqueTierra = document.getElementById("boton-tierra");
const botonReiniciarJuego = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const sectionMensajes = document.getElementById("resultado");

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5)
console.log(hipodoge)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciarJuego.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonAtaqueFuego.addEventListener("click", ataqueFuego);
  botonAtaqueAgua.addEventListener("click", ataqueAgua);
  botonAtaqueTierra.addEventListener("click", ataqueTierra);
  botonReiniciarJuego.addEventListener("click", reiniciarJuego);
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueEnemigoAleatorio();
}

function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueEnemigoAleatorio();
}

function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueEnemigoAleatorio();
}

function ataqueEnemigoAleatorio() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }

  combate();
}
function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("Empate 🙃");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    vidasEnemigo--; //descontamos a la variable una unidad
    spanVidasEnemigo.innerHTML = vidasEnemigo; //considerar que aquí siempre va la cantidad final a mostrar
    crearMensaje("Ganaste 🥳");
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje("Ganaste 🥳");
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje("Ganaste 🥳");
  } else {
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
    crearMensaje("Perdiste 😥");
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("GANASTE 🎉");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("PERDISTE 😭");
  }
}

function seleccionarMascotaJugador() {
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
    sectionSeleccionarMascota.style.display = "none";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
    sectionSeleccionarMascota.style.display = "none";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
    sectionSeleccionarMascota.style.display = "none";
  } else {
    alert("SELECCIONA UNA MASCOTA");
    sectionSeleccionarMascota.style.display = "flex";
    sectionSeleccionarAtaque.style.display = "none";
  }

  seleccionarMascotaEnemigo();
}
function seleccionarMascotaEnemigo() {
  let mascotaEnemigoAleatorio = aleatorio(1, 3);

  if (mascotaEnemigoAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaEnemigoAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  botonAtaqueFuego.disabled = true;
  botonAtaqueAgua.disabled = true;
  botonAtaqueTierra.disabled = true;
  sectionReiniciarJuego.style.display = "block";
}
function reiniciarJuego() {
  location.reload();
}
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Esta línea de código permite que primero se cargue la etiqueta SCRIPT que está en la etiqueta HEAD del HTML
window.addEventListener("load", iniciarJuego);
