'use strict'

import { getAlunoMatricula } from "./consumoapi.js"

const createInfo = (dados) => {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')
    div.classList.add('info-alunos')
    img.src = dados.imagem
    span.textContent = dados.nome

    div.appendChild(img)
    div.appendChild(span)

    return div

}


const createDesempenho = (dados) => {

    const div = document.createElement('div')
    const bar = document.createElement('bar')
    const desempenhoBar = document.createElement('div')
    const nota = document.createElement('span')
    const disciplina = document.createElement('span')

    div.classList.add('container')
    bar.classList.add('desempenho')
    desempenhoBar.classList.add('desempenho-bar')
    nota.classList.add('nota')
    disciplina.classList.add('disciplina')

    if(dados.media > 60) {
        desempenhoBar.classList.add('azul')
        nota.classList.add('azul-text')
    }else if(dados.media < 50){
        desempenhoBar.classList.add('vermelho')
        nota.classList.add('vermelho-text')
    }else{
        desempenhoBar.classList.add('amarelo')
        nota.classList.add('amarelo-text')
    }

    nota.textContent = dados.media
    desempenhoBar.style.height = dados.media + '%'
    disciplina.textContent = dados.sigla

    bar.appendChild(desempenhoBar)
    
    div.appendChild(nota)
    div.appendChild(bar)
    div.appendChild(disciplina)

    return div
}

const getInfo = async () => {

    const main = document.querySelector('main')
    const desempenhoContainer = document.createElement('div')
    desempenhoContainer.classList.add('container-desempenho')

    const dados = await getAlunoMatricula(localStorage.getItem('idAluno'), localStorage.getItem('curso'))

    const info = createInfo(dados[0])
    const desempenho = dados[0].desempenho.map(createDesempenho)


    desempenhoContainer.replaceChildren(...desempenho)
    main.appendChild(info)
    main.appendChild(desempenhoContainer)
}

getInfo()