const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciarJuego = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");

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

const contenedorAtaques = document.getElementById("contenedor-ataques");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;

let botonAtaqueAgua;
let botonAtaqueFuego;
let botonAtaqueTierra;

let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
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

  botonReiniciarJuego.addEventListener("click", reiniciarJuego);
  
  
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";
  
    if (inputHipodoge.checked) {
      spanMascotaJugador.innerHTML = inputHipodoge.id;
      mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
      spanMascotaJugador.innerHTML = inputCapipepo.id;
      mascotaJugador = inputCapipepo.id;
     
    } else if (inputRatigueya.checked) {
      spanMascotaJugador.innerHTML = inputRatigueya.id;
      mascotaJugador = inputRatigueya.id;
     
    } else {
      alert("SELECCIONA UNA MASCOTA");
      sectionSeleccionarMascota.style.display = "flex";
      sectionSeleccionarAtaque.style.display = "none";
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
  }

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques;
        }        
    }

    mostrarAtaques(ataques)
    //console.log(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonAtaqueAgua = document.getElementById("boton-agua");
    botonAtaqueFuego = document.getElementById("boton-fuego");
    botonAtaqueTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll('.BAtaque')

     
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO');
                boton.style.background = '#B1D1C5';
                boton.disabled = true;
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA');
                boton.disabled = true;
                boton.style.background = '#B1D1C5';
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#B1D1C5';
                boton.disabled = true;
            }
            ataqueEnemigoAleatorio()
        })
    })
    
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigoAleatorio = aleatorio(0, mokepones.length-1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigoAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaEnemigoAleatorio].ataques
    secuenciaAtaque();
  }


function ataqueEnemigoAleatorio() {
  let ataqueAleatorio = aleatorio(0, ataqueEnemigo.length-1);
  console.log(ataqueAleatorio)
 
  for(let index = 0;index < ataqueJugador.length; index++){
    if(ataqueJugador[index] === "FUEGO"|| ataqueJugador[index] === "TIERRA"){
      ataqueEnemigo.push(ataqueJugador[index]);
      
    } else if(ataqueJugador[index] === "AGUA" || ataqueJugador[index] === "FUEGO"){
      ataqueEnemigo.push(ataqueJugador[index]);
    } else if(ataqueJugador[index] === "TIERRA"|| ataqueJugador[index] === "AGUA"){
      ataqueEnemigo.push(ataqueJugador[index]);
    } else {
      ataqueEnemigo.push(ataqueJugador[index]);
    }
      
    
  } 
  
  //combate();
  iniciarPelea(); //llamamos a la función que inicia el combate
  console.log(ataqueEnemigo)
}

function iniciarPelea(){
  if(ataqueJugador.length === 5){
    combate()
    
  }
}

function indexAmbosOponentes(jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
  for(let index = 0;index < ataqueJugador.length; index++){
    if(ataqueJugador[index] === ataqueEnemigo[index]){
      indexAmbosOponentes(index, index)
      crearMensaje("EMPATE 🙃");
      
    } else if(ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA"){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🥳");
      victoriasJugador++;      
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🥳");
      victoriasJugador++;      
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA"){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🥳");
      victoriasJugador++;      
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index)
      crearMensaje("PERDISTE 😥");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
      
    
  } 

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("EMPATE");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE");
  } else {
    crearMensajeFinal("PERDISTE");
  }
}


function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  
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
