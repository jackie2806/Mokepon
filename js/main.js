const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciarJuego = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonAtaqueFuego = document.getElementById("boton-fuego");
const botonAtaqueAgua = document.getElementById("boton-agua");
const botonAtaqueTierra = document.getElementById("boton-tierra");
sectionReiniciarJuego.style.display = "none";
const botonReiniciarJuego = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");


const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const sectionMensajes = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let vidasJugador = 3;
let vidasEnemigo = 3;
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
//Objetos instancia que vienen de una clase
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)


//Objecto literarios, construidos desde cero, solo guardan información
hipodoge.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    
)
capipepo.ataques.push(
    {nombre: '🌱', id:'boton-agua'},
    {nombre: '🌱', id:'boton-agua'},
    {nombre: '🌱', id:'boton-agua'},
    {nombre: '💧', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-tierra'},
    
)
ratigueya.ataques.push(
    {nombre: '🔥', id:'boton-agua'},
    {nombre: '🔥', id:'boton-agua'},
    {nombre: '🔥', id:'boton-agua'},
    {nombre: '💧', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    
)

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() { 
sectionSeleccionarAtaque.style.display = "none";
  mokepones.forEach((mokepon)=>{ //importante colocar espacio antes de cerrar la etiqueta input cuando se usa template.
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;   
    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
    
  })
  
  
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);   
  botonAtaqueFuego.addEventListener("click", ataqueFuego);
  botonAtaqueAgua.addEventListener("click", ataqueAgua);
  botonAtaqueTierra.addEventListener("click", ataqueTierra);
  botonReiniciarJuego.addEventListener("click", reiniciarJuego);
  
  
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";
  
    if (inputHipodoge.checked) {
      spanMascotaJugador.innerHTML = inputHipodoge.id;
      sectionSeleccionarMascota.style.display = "none";
    } else if (inputCapipepo.checked) {
      spanMascotaJugador.innerHTML = inputCapipepo.id;
      sectionSeleccionarMascota.style.display = "none";
    } else if (inputRatigueya.checked) {
      spanMascotaJugador.innerHTML = inputRatigueya.id;
      sectionSeleccionarMascota.style.display = "none";
    } else {
      alert("SELECCIONA UNA MASCOTA");
      sectionSeleccionarMascota.style.display = "flex";
      sectionSeleccionarAtaque.style.display = "none";
    }
  
    seleccionarMascotaEnemigo();
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


function seleccionarMascotaEnemigo() {
  let mascotaEnemigoAleatorio = aleatorio(0, mokepones.length-1);
  spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigoAleatorio].nombre
  
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
