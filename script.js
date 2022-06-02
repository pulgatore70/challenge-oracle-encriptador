const inputTexto = document.querySelector(".input-text");
const mensaje = document.querySelector(".input-text-area");
let imagenOcultar = document.querySelector(".imagenMunheco");
let mensajeOcultar = document.querySelector(".contenedor-h3");
let ingreseOcultar = document.querySelector(".contenedor-parrafo");
let mensEncrMostrar = document.querySelector("#mensajeEncriptado");
let btncopiarMostrar = document.querySelector(".btnCopiar");
let copiarTexto = document.querySelector("#cajaTexto");
let actualizarMostrar = document.querySelector(".ActualizarPagina");
let btnEncriptarOcultar = document.querySelector(".btnEncriptar");
let btnDesencriptarOcultar = document.querySelector(".btnDesencriptar");
let textoH4 = document.querySelector(".texto-h4");

//hago un validador para que solo se ingrese minusculas
inputTexto.addEventListener("keypress", function(event) {
    if(event.charCode>=33 && event.charCode<=96 || event.charCode>=123 && event.charCode<=126) {  
        event.preventDefault();
        alert("Solo se permiten minusculas y sin acentos, gracias");
    }
});

//funcion para encriptar el texto ingresado al mismo tiempo oculta lo que se ve al principio y muestra
//el texto encriptado y el boton copiar y oculta el boton encriptar
function btnencriptar() {
    if(encriptar(inputTexto.value) == "") {
        alert("ingrese texto para encriptar");
        inputTexto.focus();
    }
    if(encriptar(inputTexto.value)!= "") {
     const textoEncriptado = encriptar(inputTexto.value);
     mensaje.value = textoEncriptado;
     ocultarBloque();
     mostrarBloque();
     inputTexto.value = "";
     ocultarBotonEncr();
    }   
}

//funcion para encriptar el texto ingresado
function encriptar(stringParaEncriptar) { 
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    for(let i=0;i<matrizCodigo.length;i++) { 
        if(stringParaEncriptar.includes(matrizCodigo[i][0])) {
          stringParaEncriptar = stringParaEncriptar.replaceAll(matrizCodigo[i][0],
          matrizCodigo[i][1]);           
        }
    }
    return stringParaEncriptar;  
}

//funcion para ocultar lo que se ve al principio imagen -ningun mensaje- ingrese el texto cuando presiono boton encriptar
function ocultarBloque() {
    imagenOcultar.classList.add("ocultar");
    mensajeOcultar.classList.add("ocultar");
    ingreseOcultar.classList.add("ocultar");
}

//funcion que muestra una vez oculto lo del principio el texto encriptado y el boton copiar
function mostrarBloque() {
    mensEncrMostrar.style.display="block";
    btncopiarMostrar.style.display="block";   
}

function actualizarPagina() {
    window.location.reload();
} 

function mostrarBoton() {
    actualizarMostrar.style.display="block";
    textoH4.style.display="block";
}

function ocultarBotonEncr() {
    btnEncriptarOcultar.classList.add("ocultar");
}

function ocultarBotonDesencr() {
    btnDesencriptarOcultar.classList.add("ocultar");
}

function btndesencriptar() {
    if(inputTexto.value == "" && mensaje.value == "") {
     alert("Primero debe encriptar el texto, ingrese texto y haga clic en encriptar");
     inputTexto.focus();
    }
    if(inputTexto.value == "" && mensaje.value != "") {
        alert("Debe copiar el texto encriptado con el boton Copiar y pegar con ctrl+v");
        inputTexto.focus();
    }
    if(inputTexto.value != "" && mensaje.value == "") {
        alert("debe hacer clic en el boton encriptar");
    }
    if(inputTexto.value != "" && mensaje.value != "") {
     const textoDesencriptado = desencriptar(mensaje.value);
     mensaje.value = textoDesencriptado;
     ocultarBotonDesencr();
     mostrarBoton();
    }
}   

function desencriptar(stringParaDesencriptar) {
    let matrizCodigo = [["enter","e"],["imes","i"],["ai","a"],["ober","o"],["ufat","u"]];
    for(let i=0;i<matrizCodigo.length;i++) {
        if(stringParaDesencriptar.includes(matrizCodigo[i][0])) {
            stringParaDesencriptar = stringParaDesencriptar.replaceAll(matrizCodigo[i][0],
                matrizCodigo[i][1]);
        }
    }
    return stringParaDesencriptar;
}

function btncopiar() {
    document.getElementById("cajaTexto").placeholder="Pegue aquí para desencriptar, ctrl+v";
    navigator.clipboard.writeText(mensaje.value);
    mensaje.select();
    inputTexto.focus();
}