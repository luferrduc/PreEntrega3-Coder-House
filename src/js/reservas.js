
const DateTime = luxon.DateTime

const toggleMenu = document.querySelector('#toggle-menu')
const navbar = document.querySelector('#navbar')
const inputCiudad = document.querySelector('#inputNombre')
const listaReservas = document.querySelector('#lista-reservas')
const inputNombre = document.querySelector('#inputNombre')
const reservaNoEncontrada = document.querySelector('#reservaNoEncontrada')


toggleMenu.addEventListener('click', (e) => {
    navbar.classList.toggle('hidden')

})



const crearReservaCard = (reserva) => {

    let {id, cantPersonas, ciudad, hotel, precio, nombrePersona, fechaSalida,fechaEntrada } = reserva
    // let buttonModalReserva = toggleModalButton(idHotel)
    
    let reservaCard = 
    `
    <div class="card rounded-md p-4 bg-[#cdac88] flex flex-col gap-y-4 justify-between"> 
        <img src="../assets/img/Ace_Hotel_Kyoto.jpg" class="rounded" >
        <h3 class="font-bold text-lg text-[#1a425d]" >${hotel}, ${ciudad}</h3>
        <p class="text-sm font-semibold flex-grow justify-center">Total de personas: ${cantPersonas}</p>
        <div class="flex flex-col gap-4 lg:flex-row lg:gap-2 justify-between items-center"> 
            <p class="font-bold">Fecha de ingreso: ${fechaEntrada}</p>
            <p class="font-bold">Fecha de salida: ${fechaSalida}</p>
        </div>
        <div class="flex flex-col gap-4 lg:flex-row lg:gap-2 justify-between items-center"> 
            <p class="font-bold">Total: $${precio}</p>
        </div>
    </div>
    `;
    return reservaCard;
}



inputNombre.addEventListener('keyup', (e) => {
    
    let reservas = JSON.parse(localStorage.getItem('reservas'))
    listaReservas.innerHTML= ``
    let nombrePersona = e.target.value
    let reservaDOM;


    if(nombrePersona != ''){
        
        let reservasEncontradas = reservas.filter((reserva) => {
            return reserva.nombrePersona.toUpperCase().includes(nombrePersona.toUpperCase())
        })
    
        if(reservasEncontradas.length > 0){
            reservaNoEncontrada.classList.add('hidden')
            listaReservas.classList.remove('hidden')

            reservasEncontradas.map((reserva) => {
                let reservaE = {
                    id: reserva.id, 
                    nombrePersona: reserva.nombrePersona, 
                    precio: Math.round(reserva.precio), 
                    hotel: reserva.hotel,
                    ciudad: reserva.ciudad,
                    cantPersonas: reserva.cantPersonas,
                    fechaEntrada: DateTime.fromISO(reserva.fechaEntrada).toFormat('dd-MM-yyyy HH:mm'),
                    fechaSalida: DateTime.fromISO(reserva.fechaSalida).toFormat('dd-MM-yyyy HH:mm')
                }
               
                reservaDOM+= crearReservaCard(reservaE)
               
            })
            console.table(reservasEncontradas)
            listaReservas.innerHTML= reservaDOM 
        }else{
            reservaDOM = `<p class="mx-auto"> No existen reservas para ${nombrePersona}</p>`
            listaReservas.classList.add('hidden')
            reservaNoEncontrada.classList.remove('hidden')
            reservaNoEncontrada.innerHTML = reservaDOM
        }
    }else{
        listaReservas.classList.remove('hidden')
        reservaNoEncontrada.classList.add('hidden')
        // reservaDOM = listarHoteles()
        // listaReservas.innerHTML = reservaDOM
    }


})

document.addEventListener('DOMContentLoaded', () => {
    
   
    
    
})