'use strict'

import { listarEstudantes } from "./consumoapi.js"

const criarLista = (dados) => {
    const a = document.createElement('a')
    const img = document.createElement('img')
    const span = document.createElement('span')
    a.classList.add('cards-alunos')
    img.src = dados.imagem
    span.textContent = dados.nome
    img.classList.add('dados')
    span.classList.add('dados')
    a.id = dados.matricula
    a.href = './desempenho.html'
   
    if(dados.status == 'Cursando'){
        a.classList.add('card-azul')
    }if(dados.status == 'Finalizado'){
        a.classList.add('card-amarelo')
    }

    a.appendChild(img)
    a.appendChild(span)

    return a

}

const loadLista = async (curso) => {

    const main = document.querySelector('main')
    const data = await listarEstudantes(curso)

    const cards = data.map(criarLista)

    main.replaceChildren(...cards)
   
}

loadLista(localStorage.getItem('curso'))

document.getElementById('status').addEventListener('click', (event) => {

    const cardAmarelo = document.querySelectorAll('.card-amarelo')
    const cardAzul = document.querySelectorAll('.card-azul')

    if (event.target.textContent == 'Finalizado') {
        cardAzul.forEach(item => {
            item.classList.remove('ativo')
            item.classList.add('inativo')
        })
        cardAmarelo.forEach(item => {
            item.classList.remove('inativo')
            item.classList.add('ativo')
        })
    }

    if (event.target.textContent == 'Cursando') {
        cardAmarelo.forEach(item => {
            item.classList.remove('ativo')
            item.classList.add('inativo')
        })
        cardAzul.forEach(item => {
            item.classList.remove('inativo')
            item.classList.add('ativo')
        })
    }

    if (event.target.textContent == 'Status') {
        cardAzul.forEach(item => {
            item.classList.remove('inativo')
            item.classList.add('ativo')
        })
        cardAmarelo.forEach(item => {
            item.classList.remove('inativo')
            item.classList.add('ativo')
        })
    }
    console.log(event.target)
})

document.querySelector('main').addEventListener('click', (event) => {

    if (event.target.classList.contains('cards-alunos')) {
        localStorage.setItem('idAluno', event.target.id)
    }
    if (event.target.classList.contains('dados')) {
        localStorage.setItem('idAluno', event.target.parentElement.id)
    }
})
