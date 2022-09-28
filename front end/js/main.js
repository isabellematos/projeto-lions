'use strict'

import { escolherCurso } from "./consumoapi.js"


const criarCard = (dados) => {
    const a = document.createElement('a')
    const div = document.createElement('div')
    div.classList.add('cards')
    a.textContent = dados.sigla
    a.href = './pages/consumo.html'
    a.classList.add('link')
    div.appendChild(a)
    return div
}

const loadCard = async () => {
    const container = document.getElementById('retangulo')
    const dados = await escolherCurso()

    const cards = dados.map(criarCard)

    container.replaceChildren(...cards)
}

loadCard()


document.getElementById('retangulo').addEventListener('click', (event) => {

    localStorage.setItem('curso', event.target.textContent)

})


