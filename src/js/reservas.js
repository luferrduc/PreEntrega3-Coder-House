const toggleMenu = document.querySelector('#toggle-menu')
const navbar = document.querySelector('#navbar')
const inputCiudad = document.querySelector('#inputNombre')
const listaReservas = document.querySelector('#lista-reservas')


toggleMenu.addEventListener('click', (e) => {
    navbar.classList.toggle('hidden')

})