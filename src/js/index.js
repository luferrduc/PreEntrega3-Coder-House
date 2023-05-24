//  Variables del DOM

const listaHoteles = document.querySelector('#lista-hoteles')
const agregarTexto  = document.querySelector("#agregar-texto")



agregarTexto.addEventListener('click', (e) => {

    listaHoteles.innerHTML= `<p> Hola desde el JS </p>`
})

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
const ciudades = [
    {
        id: 1,
        nombre: "Tokyo",
        hoteles: [
            {
                id: 1,
                nombre: "Sotetsu Fresa Inn Ginza-Nanachome",
                precio: 85294,
                habitaciones: [101,102,103,201,202,203]

            },
            {
                id: 2,
                nombre: "The Square Hotel GINZA",
                precio: 117280,
                habitaciones: [101,102,103,201,202,203]
            },
        ],
        precio: 50000
    },
    {
        id: 2,
        nombre: "Kyoto",
        hoteles: [
            {
                id: 1,
                nombre: "Hotel Resol Kyoto Kawaramachi Sanjo",
                precio: 90459,
                habitaciones: [101,102,103,201,202,203]
            },
            {
                id: 2,
                nombre: "Hotel Resol Trinity Kyoto",
                precio: 102412,
                habitaciones: [101,102,103,201,202,203]
            },
        ],
        precio: 35000
    },
    {   
        id: 3,
        nombre: "Osaka", 
        hoteles: [
            {
                id: 1,
                nombre: "Sotetsu Fresa Inn Osaka Namba",
                precio: 65748,
                habitaciones: [101,102,103,201,202,203]
            },
            {
                id: 2,
                nombre: "Nest Hotel Osaka Umeda",
                precio: 58569,
                habitaciones: [101,102,103,201,202,203]
            },
        ],
        precio: 40000
    },
    {
        id: 4,
        nombre: "Nara",
        hoteles: [
            {
                id: 1,
                nombre: "Nara Royal Hotel",
                precio: 41403,
                habitaciones: [101,102,103,201,202,203]
            },
            {
                id: 2,
                nombre: "Hotel Nikko Nara",
                precio: 60772,
                habitaciones: [101,102,103,201,202,203]
            },
        ],
        precio: 25000
    }
]

const dbReservas = [
    {
        id: "b4gkn6isr4i",
        ciudad: "Tokyo",
        hotel: "Sotetsu Fresa Inn Ginza-Nanachome",
        cantPersonas: 2,
        precio: 160000,
        habitacion: 202,
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
        habitacion: 101,
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
    let persona = new Persona(dbPersona.nombre, dbPersona.edad, dbPersona.rut)
    personas.push(persona)
})
