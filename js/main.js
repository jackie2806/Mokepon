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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
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

let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;
if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa-20;
}
alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMkp(){
      lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}
//Objetos instancia que vienen de una clase
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

// Enemigos
let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')


//Objecto literarios, construidos desde cero, solo guardan información de los ataques
hipodoge.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    
)
hipodogeEnemigo.ataques.push(
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
capipepoEnemigo.ataques.push(
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
ratigueyaEnemigo.ataques.push(
  {nombre: '🔥', id:'boton-agua'},
  {nombre: '🔥', id:'boton-agua'},
  {nombre: '🔥', id:'boton-agua'},
  {nombre: '💧', id:'boton-fuego'},
  {nombre: '🌱', id:'boton-tierra'},
  
)

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() { 
sectionSeleccionarAtaque.style.display = "none";
sectionVerMapa.style.display = "none";
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
   
    if (inputHipodoge.checked) {
      spanMascotaJugador.innerHTML = `
      <p>${hipodoge.nombre}</p>
      <img src=${hipodoge.foto} alt=${hipodoge.nombre}>
      `;
      //inputHipodoge.id
      //mascotaJugador = inputHipodoge.id;
      mascotaJugador= hipodoge.nombre;
    } else if (inputCapipepo.checked) {
      spanMascotaJugador.innerHTML = `
      <p>${capipepo.nombre}</p>
      <img src=${capipepo.foto} alt=${capipepo.nombre}>
      `;
      mascotaJugador = capipepo.nombre;
      // spanMascotaJugador.innerHTML = inputCapipepo.id;
      // mascotaJugador = inputCapipepo.id;
     
    } else if (inputRatigueya.checked) {
      spanMascotaJugador.innerHTML = `
      <p>${ratigueya.nombre}</p>
      <img src=${ratigueya.foto} alt=${ratigueya.nombre}>
      `;
      mascotaJugador = ratigueya.nombre;
      
      // spanMascotaJugador.innerHTML = inputRatigueya.id;
      // mascotaJugador = inputRatigueya.id;
     
    } else {
      alert("SELECCIONA UNA MASCOTA");
      sectionSeleccionarMascota.style.display = "flex";
      sectionSeleccionarAtaque.style.display = "none";
    }
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = "flex";   
    iniciarMapa();
    
  }

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques;
        }        
    }
    mostrarAtaques(ataques)   
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    
    botonAtaqueAgua = document.getElementById("boton-agua");
    botonAtaqueFuego = document.getElementById("boton-fuego");
    botonAtaqueTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll('.BAtaque');     
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('🔥');
                boton.style.background = '#B1D1C5';
                boton.disabled = true;
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('💧');
                boton.disabled = true;
                boton.style.background = '#B1D1C5';
            } else {
                ataqueJugador.push('🌱')
                boton.style.background = '#B1D1C5';
                boton.disabled = true;
            }
            ataqueEnemigoAleatorio()
        })
    })    
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML= `
    <p>${mokepones[mascotaAleatoria].nombre}</p>
    <img src=${mokepones[mascotaAleatoria].foto} alt=${mokepones[mascotaAleatoria].nombre}>
    `
    //spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre; //Se muestra el nombre del mokepon
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataque; //Se muestra los ataques
    secuenciaAtaque();
} 


function ataqueEnemigoAleatorio() {
  let ataqueAleatorio = aleatorio(0, ataqueEnemigo.length-1);
  console.log(ataqueAleatorio)
 
  for(let index = 0;index < ataqueJugador.length; index++){
    if(ataqueJugador[index] === "🔥"|| ataqueJugador[index] === "🌱"){
      ataqueEnemigo.push(ataqueJugador[index]);      
    } else if(ataqueJugador[index] === "💧" || ataqueJugador[index] === "🔥"){
      ataqueEnemigo.push(ataqueJugador[index]);
    } else if(ataqueJugador[index] === "🌱"|| ataqueJugador[index] === "💧"){
      ataqueEnemigo.push(ataqueJugador[index]);
    } else {
      ataqueEnemigo.push(ataqueJugador[index]);
    }      
  
  } 
  console.log(ataqueEnemigo)
  
  iniciarPelea(); //llamamos a la función que inicia el combate  
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
      
    } else if(ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "🌱"){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🥳");
      victoriasJugador++;      
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🔥"){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🥳");
      victoriasJugador++;      
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[index] === "🌱" && ataqueEnemigo[index] === "💧"){
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
    crearMensajeFinal("EMPATE 🙃");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE 🥳");
  } else {
    crearMensajeFinal("PERDISTE 😥");
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
//Canva
function pintarCanvas(){
  
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0,0,mapa.width,mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0,mapa.width, mapa.height)
  
  mascotaJugadorObjeto.pintarMkp();
  hipodogeEnemigo.pintarMkp();
  capipepoEnemigo.pintarMkp();
  ratigueyaEnemigo.pintarMkp();

  if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function moverDerecha(){    
  mascotaJugadorObjeto.velocidadX = 5;  
}

function moverIzquierda(){  
  mascotaJugadorObjeto.velocidadX = -5;    
}

function moverArriba(){
  mascotaJugadorObjeto.velocidadY = -5;  
}

function moverAbajo(){
  mascotaJugadorObjeto.velocidadY = 5;  
}

function detenerMovimiento(){  
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}
function sePresionaTecla(event){
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default:
      break;
  }

}

function iniciarMapa(){
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePresionaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
  for (let i = 0; i < mokepones.length; i++) {
    if(mascotaJugador === mokepones[i].nombre){
        return mokepones[i]
    }        
}
}

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if(abajoMascota < arribaEnemigo || 
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo){ //evaluar que no se choque con el borde del canva
      return;
    }
  detenerMovimiento()
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);
  clearInterval(intervalo);
}

// Esta línea de código permite que primero se cargue la etiqueta SCRIPT que está en la etiqueta HEAD del HTML
window.addEventListener("load", iniciarJuego);
