//  Variables del DOM

const listaHoteles = document.querySelector('#lista-hoteles')
const agregarTexto  = document.querySelector("#agregar-texto")
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


// AGREGAR LOCAL STORAGE Y/O SESSION STORAGE PARA MANIPULAR RESERVAS
// Se podría usar el local storage para almacenar las reservas de forma persistente (total)
// Y usar el session storage para primero almacenar el del momento, que al finalizar
// irá al local storage


console.log(localStorage)
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
                id: 1,
                nombre: "Sotetsu Fresa Inn Ginza-Nanachome",
                precio: 85294,
                descripcion: "Buen hotel inmerso en Ginza"
            },
            {
                id: 2,
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
                id: 3,
                nombre: "Hotel Resol Kyoto Kawaramachi Sanjo",
                precio: 90459,
                descripcion: "Hotel estilo antiguo con toques modernos"
            },
            {
                id: 4,
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
                id: 5,
                nombre: "Sotetsu Fresa Inn Osaka Namba",
                precio: 65748,
                descripcion: "Hotel al más puro estilo Edo"
            },
            {
                id: 6,
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
                id: 7,
                nombre: "Nara Royal Hotel",
                precio: 41403,
                descripcion: ""
            },
            {
                id: 8,
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

const dbPersonas = [
    {
        id: 1,
        rut: "18621142-1",
        nombre: "Luciano Ferrando",
        email: "luciano.ferrando94@gmail.com",
        edad: 29
    }
]

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

localStorage.setItem('reservas', JSON.stringify(reservas))
localStorage.setItem('personas', JSON.stringify(personas))


function openModal(){
    console.log('LOG MODAL')
    defaultModal.classList.toggle('hidden')

    console.log(e)
    

}


function buscarHotel(id){
    let hotelEncontrado = hoteles.find( (hotel) =>  {
        
    })

    return hotelEncontrado
}


const $ = (selector) => document.querySelector(selector)



function handleModalClick(e){
    const target = e.target
    if(target.tagName === 'BUTTON' && target.classList.contains('modalButton') ){
        defaultModal.classList.toggle('hidden')
        let id = e.target.attributes[0].value

        let hotel = buscarHotel(id)
        console.log(id)
        console.log(hotel)
    }
}


const toggleModalButton = (idHotel) => {

  
    return (`<button id=${idHotel} 
    
    data-modal-target="defaultModal" data-modal-toggle="defaultModal" 
    class="text-white bg-[#4A7674] hover:bg-[#AEC8B2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
    rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#4A7674] dark:hover:bg-[#AEC8B2] dark:focus:ring-[#4A7674]
    transition-all ease-in-out modalButton
    " type="button">
        Reservar
    </button>`)
}

$("#lista-hoteles").addEventListener('click', handleModalClick, true)

const crearHotelCard = (hotel, ciudad) => {
    let {id: idHotel, nombre: nombreHotel, precio: precioHotel, descripcion} = hotel;
    let {id: idCiudad, nombre: nombreCiudad} = ciudad;    

    let buttonModalReserva = toggleModalButton(idHotel)

    let hotelCard = 
    `
    <div class="card rounded-md p-4 bg-[#cdac88] flex flex-col gap-y-4 justify-between"> 
        <img src="./assets/img/Ace_Hotel_Kyoto.jpg" class="rounded" >
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

document.addEventListener('DOMContentLoaded', () => {
    listaHoteles.innerHTML = listarHoteles()


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


botonCerrarModal.addEventListener('click', (e) => {
    defaultModal.classList.toggle('hidden')
})


window.addEventListener('click', (e) => {
    if(e.target == defaultModal){
        defaultModal.classList.toggle('hidden')
    }
})

cerrarModalButton.addEventListener('click', (e) => {
    defaultModal.classList.toggle('hidden')
})

fechaIngresoInput.addEventListener('change', (e) => {
    console.log(e.target.value)
    console.log(typeof e.target.value)
    const fecha = new Date(e.target.value).
    console.log(fecha)
})


// listaRenderHoteles.addEventListener('')