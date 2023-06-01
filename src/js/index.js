// IMPORTS

import dbPersonas from "./dbPersonas.js"

// LUXON PARA MANEJO DE FECHAS
const DateTime = luxon.DateTime


//  Variables del DOM
const listaHoteles = document.querySelector('#lista-hoteles')
const inputCiudad = document.querySelector('#inputCiudad')
const ciudadesNoEncontradas = document.querySelector('#ciudadesNoEncontradas')
const toggleMenu = document.querySelector('#toggle-menu')
const navbar = document.querySelector('#navbar')
const formReserva = document.getElementById('reservaHotelForm')
const nombreHotelForm = document.getElementById('nombreHotelForm')
const descripcionForm = document.getElementById('descripcionForm')
const fechaIngresoInput = document.getElementById('fechaIngreso')
const fechaSalidaInput = document.getElementById('fechaSalida')
const cantidadPersonasInput = document.getElementById('cantidadPersonas')
const defaultModal = document.getElementById('defaultModal')
const cerrarModal = document.getElementById('cerrarModal')
const botonCerrarModal = document.getElementById('botonCerrarModal')
const cerrarModalButton = document.getElementById('cerrarModalButton')
const valorFinalContainer = document.getElementById('valorFinal')
// Datos Persona
const rutPersonaInput = document.getElementById('rutPersona')
const nombrePersonaInput = document.getElementById('nombrePersona')
const edadPersonaInput = document.getElementById('edadPersona')

// AGREGAR LOCAL STORAGE Y/O SESSION STORAGE PARA MANIPULAR RESERVAS
// Se podría usar el local storage para almacenar las reservas de forma persistente (total)
// Y usar el session storage para primero almacenar el del momento, que al finalizar
// irá al local storage


// console.log(localStorage)
// Lista de ciudades con sus respectivos Hoteles y precios

// TOKYO
// - Sotetsu Fresa Inn Ginza-Nanachome 85.294
// - The square hotel GINZA = 117.280
// OSAKA
// - Sotetsu Fresa Inn Osaka Namba = 65.748
// - Nest Hotel Osaka Umeda = 58.569
// KYOTO
// - Hotel Resol Kyoto Kawaramachi Sanjo = 90.459
// - Hotel Resol Trinity Kyoto = 102.412
// NARA
// - Nara Royal Hotel = 41.403
// - Hotel Nikko Nara = 60.772
const hoteles = [
    {
        id: 1,
        nombre: "Tokyo",
        hoteles: [
            {
                id: 10,
                nombre: "Sotetsu Fresa Inn Ginza-Nanachome",
                precio: 85294,
                descripcion: "Buen hotel inmerso en Ginza"
            },
            {
                id: 20,
                nombre: "The Square Hotel GINZA",
                precio: 117280,
                descripcion: "Hotel de lujo en medio de Ginza"
            },
        ]    
    },
    {
        id: 2,
        nombre: "Kyoto",
        hoteles: [
            {
                id: 30,
                nombre: "Hotel Resol Kyoto Kawaramachi Sanjo",
                precio: 90459,
                descripcion: "Hotel estilo antiguo con toques modernos"
            },
            {
                id: 40,
                nombre: "Hotel Resol Trinity Kyoto",
                precio: 102412,
                descripcion: "Hotel más moderno de Kyoto"
            },
        ],
    },
    {   
        id: 3,
        nombre: "Osaka", 
        hoteles: [
            {
                id: 50,
                nombre: "Sotetsu Fresa Inn Osaka Namba",
                precio: 65748,
                descripcion: "Hotel al más puro estilo Edo"
            },
            {
                id: 60,
                nombre: "Nest Hotel Osaka Umeda",
                precio: 58569,
                descripcion: "Inmerso en el centro de la ciduad de Osaka"
            }
        ],
    },
    {
        id: 4,
        nombre: "Nara",
        hoteles: [
            {
                id: 70,
                nombre: "Nara Royal Hotel",
                precio: 41403,
                descripcion: ""
            },
            {
                id: 80,
                nombre: "Hotel Nikko Nara",
                precio: 60772,
                descripcion: ""
            }
        ],
    }
]

const dbReservas = [
    {
        id: "b4gkn6isr4i",
        ciudad: "Tokyo",
        hotel: "Sotetsu Fresa Inn Ginza-Nanachome",
        cantPersonas: 2,
        precio: 160000,
        nombrePersona: "Luciano Ferrando",
        fechaEntrada: (new Date("December 26, 2023 14:00:00")).toLocaleString(),
        fechaSalida:(new Date("December 30, 2023 14:00:00")).toLocaleString()
    },
    {
        id: "0o6nbin4af0r",
        ciudad: "Osaka",
        hotel: "Nest Hotel Osaka Umeda",
        cantPersonas: 4,
        precio: 89923,
        nombrePersona: "José Pérez",
        fechaEntrada: (new Date("March 26, 2024 11:00:00")).toLocaleString(),
        fechaSalida:(new Date("March 30, 2024 14:00:00")).toLocaleString()
    }
]

// const dbPersonas = [
//     {
//         id: 1,
//         rut: "18621142-1",
//         nombre: "Luciano Ferrando",
//         email: "luciano.ferrando94@gmail.com",
//         edad: 29
//     }
// ]

function generarID(){ 
    return Math.random().toString(30).substring(2);           
} 


class Reserva{
    constructor(id, ciudad, hotel, cantPersonas, precio, nombrePersona, fechaEntrada, fechaSalida){
        this.id = id;
        this.ciudad = ciudad;
        this.hotel = hotel;
        this.cantPersonas = cantPersonas;
        this.precio = precio;
        this.nombrePersona = nombrePersona;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
    }
}

class Persona{
    constructor(id, nombre, edad, rut){
        this.id = id;   
        this.nombre = nombre;
        this.edad = edad;
        this.rut = rut;
    }

}


// Arrays de objetos
const reservas = []
const personas = []

// Ingresar objetos de Reserva dentro del array para poblar con datos de prueba
dbReservas.map((dbReserva) => {
    let reserva = new Reserva(dbReserva.id, dbReserva.ciudad, dbReserva.hotel, dbReserva.cantPersonas, dbReserva.precio, dbReserva.nombrePersona, dbReserva.fechaEntrada, dbReserva.fechaSalida)
    
    reservas.push(reserva)
})

// Ingresar objetos de Persona dentro del array para poblar con datos de prueba
dbPersonas.map(dbPersona => {
    let persona = new Persona(dbPersona.id, dbPersona.nombre, dbPersona.edad, dbPersona.rut)
    personas.push(persona)
})

localStorage.getItem('reservas') ?? localStorage.setItem('reservas', JSON.stringify(reservas))

localStorage.getItem('personas') ?? localStorage.setItem('personas', JSON.stringify(personas))


function calcularValorReserva(valorNoche, cantidadDias){
   
    let valorFinal = valorNoche*cantidadDias*1.19

    return Math.round(valorFinal)
}

function crearPersona(){
    let edadPersona = parseInt(edadPersonaInput.value)
    let rutPersona = rutPersonaInput.value
    let nombrePersona = nombrePersonaInput.value
    
    let cantidadPersonasInscritas = personas.length
    let id = cantidadPersonasInscritas + 1
    let persona = buscarPersona(rutPersona)

    let personasLocal = JSON.parse(localStorage.getItem('personas'))

    if(!persona){
        persona = new Persona(id, nombrePersona, edadPersona, rutPersona)
        personasLocal.push(persona)
        localStorage.setItem('personas', JSON.stringify(personasLocal))
    }
    return persona
}

function buscarReserva(id){
    let reservas = JSON.parse(localStorage.getItem('reservas'))

    let reservaEncontrada = reservas.some( (reserva) => {
        return reserva.id == id
    })

    return reservaEncontrada
}

function crearReserva(idHotel, rutPersona, cantidadPersonas, fechaIngreso, fechaSalida ){

    let personaCreada =  crearPersona()
    let hotelCiudad = buscarHotel(idHotel)

    let {ciudad, hotel} = hotelCiudad
    // id, ciudad, hotel, cantPersonas, precio, nombrePersona, fechaEntrada, fechaSalida
    let idReserva = generarID()
    let repetir = buscarReserva(idReserva)
 
    while(repetir){
        repetir = buscarReserva(idReserva)
        idReserva = generarID()
    }
    let reservasLocal = JSON.parse(localStorage.getItem('reservas'))

    let fechaIngresoFinal = DateTime.fromISO(fechaIngreso)
    let fechaSalidaFinal = DateTime.fromISO(fechaSalida)
    let cantidadDias = fechaSalidaFinal.diff(fechaIngresoFinal, 'days').values.days
    
    let precioFinal = calcularValorReserva(hotel.precio, cantidadDias)

    let reserva = new Reserva(idReserva, ciudad.nombreCiudad, hotel.nombre, parseInt(cantidadPersonas), precioFinal, personaCreada.nombre, fechaIngreso, fechaSalida)
    reservasLocal.push(reserva)
    localStorage.setItem('reservas', JSON.stringify(reservasLocal))

    Toastify({
        text: `Resserva con id ${idReserva} creada correctamente`,
        duration: 3000,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right,#4A7674, #AEC8B2)",
        },
        hideProgressBar: false
      }).showToast();

    return reserva
}

function buscarPersona(rut){

    let personasStorage = JSON.parse(localStorage.getItem('personas'))

    let personaExiste = personasStorage.find(persona => persona.rut == rut)

    return personaExiste
}


function buscarHotel(idBusca){
    let hotelCiudad = {}

    for (const ciudad of hoteles) {
        let hotelE = ciudad.hoteles.find( (hotel) => {
            return parseInt(hotel.id) == parseInt(idBusca)
        }) 
        if(hotelE){
            let {id: idCiudad, nombre: nombreCiudad} = ciudad
            hotelCiudad.ciudad = {idCiudad, nombreCiudad}
            hotelCiudad.hotel = hotelE
            break
        }
    }
    return hotelCiudad
}

// Función que me permite luego usar para los eventos dinámicos
const $ = (selector) => document.querySelector(selector)



// Función para ejecutar dentro del evento de los botones dinámicos
function handleModalClick(e){
    const target = e.target
    if(target.tagName === 'BUTTON' && target.classList.contains('modalButton') ){
        defaultModal.classList.toggle('hidden')
       
        let id = e.target.attributes[0].value
        let hotel = buscarHotel(id)

        nombreHotelForm.innerHTML = `<span class="hidden">${id}</span><p>${hotel?.hotel?.nombre}, ${hotel?.ciudad?.nombreCiudad}</p>`
        descripcionForm.innerHTML= `
        
        <p class="font-bold text-lg text-slate-300">${hotel?.hotel?.descripcion}</p>
        <p class="font-bold text-xl text-slate-300"> <span class="text-black" >$</span> ${hotel?.hotel?.precio} x noche</p>`
    }


}

// Crear botón que abrirá el modal de cada uno de los hoteles
const toggleModalButton = (idHotel) => {
    
    return (
    `<button id=${idHotel}    
    data-modal-target="defaultModal" data-modal-toggle="defaultModal" 
    class="text-white bg-[#4A7674] hover:bg-[#AEC8B2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
    rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#4A7674] dark:hover:bg-[#AEC8B2] dark:focus:ring-[#4A7674]
    transition-all ease-in-out modalButton" 
    type="button">
        Reservar
    </button>`)
}

// Agregar evento a elementos dinámicos

$("#lista-hoteles").addEventListener('click', handleModalClick, true)

const crearHotelCard = (hotel, ciudad) => {
    let {id: idHotel, nombre: nombreHotel, precio: precioHotel, descripcion} = hotel;
    let {id: idCiudad, nombre: nombreCiudad} = ciudad;    
    
    let buttonModalReserva = toggleModalButton(idHotel)
    
    let hotelCard = 
    `
    <div class="card rounded-md p-4 bg-[#cdac88] flex flex-col gap-y-4 justify-between"> 
        <img src="./assets/img/${nombreHotel}.jpg" class="rounded" >
        <h3 class="font-bold text-lg text-[#1a425d]" >${nombreHotel}, ${nombreCiudad}</h3>
        <p class="text-sm font-semibold flex-grow justify-center">${descripcion}</p>
        <div class="flex flex-col gap-4 lg:flex-row lg:gap-2 justify-between items-center"> 
            <p class="font-bold">Precio: $${precioHotel} x noche</p>
            ${buttonModalReserva}
        </div>
    </div>
    `;
    return hotelCard;
}

function listarHoteles(){
    let hotelesDOM = ``
    hoteles.map((ciudad) => {
        ciudad.hoteles.forEach(hotel => {
            hotelesDOM += crearHotelCard(hotel, ciudad)
        })    
    })
    return hotelesDOM
}

function valorFinalCard(precio){
    let finalPriceCard = 
    `
    <div class="card rounded-md p-4 bg-[#f2f2f2] flex flex-col gap-y-4 justify-between"> 
        <h3 class="font-bold text-lg text-[#1a425d]" >Precio por pagar: $${precio}</h3>
    </div>
    `;

    return finalPriceCard
}

// EVENTOS 

fechaIngresoInput.addEventListener('change', (e)  => {
    if(fechaIngresoInput.value != '')
    {   
        fechaSalidaInput.disabled = false
        fechaSalidaInput.min = DateTime.fromISO(fechaIngresoInput.value).plus({days: 1}).toISO({includeOffset: false,  suppressMilliseconds: true, suppressSeconds: true})
        fechaSalidaInput.max = DateTime.local().plus({years: 10}).toFormat('yyyy-MM-dd\'T\'HH:mm')
       
    }
})

// EVENTO FORMULARIO PARA CREAR RESERVA

formReserva.addEventListener('change', (e) => {

    let idHotel = parseInt(nombreHotelForm.firstChild.textContent)
    let { hotel } = buscarHotel(idHotel)

    if(fechaIngresoInput.value != '' && fechaSalidaInput.value != ''){
        let fechaIngresoFinal = DateTime.fromISO(fechaIngresoInput.value)
        let fechaSalidaFinal = DateTime.fromISO(fechaSalidaInput.value)
        let cantidadDias = fechaSalidaFinal.diff(fechaIngresoFinal, 'days').values.days
        let valorFinal = calcularValorReserva(hotel.precio, cantidadDias)
        valorFinalContainer.innerHTML =  valorFinalCard(valorFinal)

    }
   
})

formReserva.addEventListener('submit', (e) => {
    e.preventDefault()
    let idHotel = parseInt(nombreHotelForm.firstChild.textContent)
    
    let  fechaFormateada  = DateTime.fromISO(fechaIngresoInput.value).toFormat('dd-MM-yyyy HH:mm')

    Swal.fire({
        title: 'Estás seguro?',
        text: "Tu reserva será creada y agendada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4A7674',
        cancelButtonColor: '#c56a57',
        confirmButtonText: 'Si, reservar!',

      }).then((result) => {
        if (result.isConfirmed) {
            if(rutPersonaInput.value != '' && nombrePersonaInput.value != '' && cantidadPersonasInput.value !=  '' &&  fechaIngresoInput.value  !=  '' && fechaSalidaInput.value  != '' ){
                let  reserva = crearReserva(idHotel, rutPersonaInput.value, cantidadPersonasInput.value , fechaIngresoInput.value , fechaSalidaInput.value  )
                Swal.fire(
                    `Reserva creada exitosamente`,
                    `Tu reserva fue realizada exitosamente para la fecha ${fechaFormateada}.
                    El ID de tu reserva es el siguiente: ${reserva.id}
                    `,
                    'success'
                )
            }
            valorFinalContainer.innerHTML = ''
            resetInputs()
            defaultModal.classList.toggle('hidden')
        }
      })
})




document.addEventListener('DOMContentLoaded', () => {
    listaHoteles.innerHTML = listarHoteles()
    let fechaActual = DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm');
    fechaIngresoInput.min = fechaActual
    fechaIngresoInput.max = DateTime.local().plus({years: 10}).toFormat('yyyy-MM-dd\'T\'HH:mm');
    fechaSalidaInput.max = DateTime.local().plus({years: 11}).toFormat('yyyy-MM-dd\'T\'HH:mm');
    
})

toggleMenu.addEventListener('click', (e) => {
    navbar.classList.toggle('hidden')
   
})

inputCiudad.addEventListener('keyup', (e) => {
    listaHoteles.innerHTML= ``
    let nombreCiudad = e.target.value
    let hotelDOM = ``

    if(nombreCiudad != ''){
        console.log(nombreCiudad)
        let hotelesEncontrados = hoteles.filter((ciudad) => {
            return ciudad.nombre.toUpperCase().includes(nombreCiudad.toUpperCase())
        })
    
        if(hotelesEncontrados.length > 0){
            ciudadesNoEncontradas.classList.add('hidden')
            listaHoteles.classList.remove('hidden')

            hotelesEncontrados.map((ciudad) => {
                let ciudadE = {id: ciudad.id, nombre: ciudad.nombre, precio: ciudad.precio}
                ciudad.hoteles.forEach(hotel => {
                    hotelDOM+= crearHotelCard(hotel, ciudadE)
                })
            })
            console.table(hotelesEncontrados)
            listaHoteles.innerHTML= hotelDOM 
        }else{
            hotelDOM = `<p class="mx-auto"> No existen ciudades con ese nombre </p>`
            listaHoteles.classList.add('hidden')
            ciudadesNoEncontradas.classList.remove('hidden')
            ciudadesNoEncontradas.innerHTML = hotelDOM
        }
    }else{
        listaHoteles.classList.remove('hidden')
        ciudadesNoEncontradas.classList.add('hidden')
        hotelDOM = listarHoteles()
        listaHoteles.innerHTML = hotelDOM
    }


})

rutPersonaInput.addEventListener('keyup', (e) => {
    let rutBusqueda = e.target.value
    let persona = buscarPersona(rutBusqueda)

    if(persona && rutBusqueda != '' ){
        const swalButton = Swal.mixin({
            customClass: {
              confirmButton: 'py-2 px-6 bg-[#4A7674] hover:bg-[#AEC8B2] rounded text-white font-bold transition-all ease-in-out focus:ring-2 focus:outline-none focus:ring-[#4A7674]',
            },
            buttonsStyling: false
          })
        swalButton.fire({
            title: 'Datos cargados exitosamente',
            icon: 'success',  
          })
        nombrePersonaInput.value = persona.nombre
        edadPersonaInput.value = persona.edad
    }else{
        nombrePersonaInput.value = ''  
        edadPersonaInput.value = ''
    }
})


// EVENTOS DE CIERRE Y APERTURA MODAL

botonCerrarModal.addEventListener('click', (e) => {
    resetInputs()
    defaultModal.classList.toggle('hidden')
 
})


window.addEventListener('click', (e) => {
    if(e.target == defaultModal){
        resetInputs()
        defaultModal.classList.toggle('hidden')
    }
})

cerrarModalButton.addEventListener('click', (e) => {
    resetInputs()
    defaultModal.classList.toggle('hidden')
})

fechaIngresoInput.addEventListener('change', (e) => {
    if(fechaIngresoInput.value == '') fechaSalidaInput.disabled = true
})


function resetInputs(){

    fechaIngresoInput.value = ''
    fechaSalidaInput.value = ''
    edadPersonaInput.value = ''
    nombrePersonaInput.value = ''
    rutPersonaInput.value = ''
    cantidadPersonasInput.value = ''
    fechaSalidaInput.disabled = true
}