const defaultColor = '#923456'
const defaultModo = 'color'
const defaultTamano = 64

let colorActual = defaultColor
let modoActual = defaultModo
let tamanoActual = defaultTamano

function setColorActual(nuevoColor) {
    colorActual = nuevoColor
}

function setModoActual(nuevoModo) {
    activarBoton(nuevoModo)
    modoActual = nuevoModo
}

function setTamanoActual(nuevoTamano) {
    tamanoActual = nuevoTamano
}

const selectColor = document.getElementById('selectColor')
const botonColor = document.getElementById('botonColor')
const botonArcoiris = document.getElementById('botonArcoiris')
const botonBorrar = document.getElementById('botonBorrar')
const botonLimpiar = document.getElementById('botonLimpiar')
const valorTamano = document.getElementById('valorTamano')
const barraTamano = document.getElementById('barraTamano')
const cuadricula = document.getElementById('cuadricula')

//selectColor.addEventListener('input', (e)  => setColorActual(e.target.value))
selectColor.oninput = (e) => setColorActual(e.target.value)
botonColor.onclick = () => setModoActual('color')
//botonColor.addEventListener('click', () => setModoActual('color'))
botonArcoiris.onclick = () => setModoActual('arcoiris')
botonBorrar.onclick = () => setModoActual('borrar')
botonLimpiar.onclick = () => recargarCuadricula()
barraTamano.onmousemove = (e) => actualizarValorTamano(e.target.value)
barraTamano.onchange = (e) => cambiarTamano(e.target.value)

let ratonClick = false
document.body.onmousedown = () => (ratonClick = true)
document.body.onmouseup = () => (ratonClick = false)

function cambiarTamano(valor) {
    setTamanoActual(valor)
    actualizarValorTamano(valor)
    recargarCuadricula()
}

function actualizarValorTamano(valor) {
    valorTamano.textContent = `${valor} X ${valor}`
}

function recargarCuadricula() {
    limpiarCuadricula()
    montarCuadricula(tamanoActual)
}

function limpiarCuadricula() {
    cuadricula.textContent = ''
}

function montarCuadricula(tamano) {
    cuadricula.style.gridTemplateColumns = `repeat(${tamano}, 1fr)`
    cuadricula.style.gridTemplateRows = `repeat(${tamano}, 1fr)`

    for(let i = 0; i < tamano * tamano; i++) {
        const cuadrado = document.createElement('div')
        cuadrado.classList.add('cuadrado')
        cuadrado.addEventListener('mouseover', cambiarColor)
        cuadrado.addEventListener('mousedown', cambiarColor)
        cuadricula.appendChild(cuadrado)
    }
}

function cambiarColor(e) {
    if (e.type === 'mouseover' && !ratonClick) return
    if (modoActual === 'arcoiris') {
        const aleatorioR= Math.floor(Math.random() * 256)
        const aleatorioG= Math.floor(Math.random() * 256)
        const aleatorioB= Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${aleatorioR}, ${aleatorioG}, ${aleatorioB})`
    }
    else if (modoActual === 'color') {
        e.target.style.backgroundColor = colorActual
    }
    else if (modoActual === 'borrar') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activarBoton(nuevoModo) {
    if (modoActual === 'arcoiris') {
        botonArcoiris.classList.remove('active')
    }
    else if (modoActual === 'color') {
        botonColor.classList.remove('active')
    }
    else if (modoActual === 'borrar') {
        botonBorrar.classList.remove('active')
    }
}

window.onload = () => {
    montarCuadricula(defaultTamano)
    activarBoton(defaultModo)
}