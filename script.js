const formulario = document.getElementById('form-tarefa')

const input = document.getElementById('input-tarefa')

const lista = document.getElementById('lista')

const contador = document.getElementById('contador')

const mensagemVazia = document.getElementById('mensagem-vazia')

const botoesFiltro = document.querySelectorAll('.filtro')


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

let filtroAtual = 'todas'


function salvarTarefas() {

    localStorage.setItem(
        'tarefas',
        JSON.stringify(tarefas)
    )

}


function adicionarTarefa() {

    const texto = input.value.trim()

    if (texto === '') {
        return
    }


    const novaTarefa = {

        texto: texto,

        concluida: false

    }


    tarefas.push(novaTarefa)


    salvarTarefas()

    renderizarTarefas()


    input.value = ''

    input.focus()

}


function deletarTarefa(index) {

    tarefas.splice(index, 1)

    salvarTarefas()

    renderizarTarefas()

}


function concluirTarefa(index) {

    tarefas[index].concluida =
        !tarefas[index].concluida


    salvarTarefas()

    renderizarTarefas()

}


function atualizarContador() {

    const total = tarefas.length

    const concluidas =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length


    const pendentes =
        total - concluidas


    if (total === 1) {

        contador.textContent =
            `1 tarefa • ${pendentes} pendente`

    } else {

        contador.textContent =
            `${total} tarefas • ${pendentes} pendentes`

    }

}


function filtrarTarefas() {

    if (filtroAtual === 'pendentes') {

        return tarefas.filter(
            tarefa => !tarefa.concluida
        )

    }


    if (filtroAtual === 'concluidas') {

        return tarefas.filter(
            tarefa => tarefa.concluida
        )

    }


    return tarefas

}


function renderizarTarefas() {

    lista.innerHTML = ''


    const tarefasFiltradas =
        filtrarTarefas()


    if (tarefasFiltradas.length === 0) {

        mensagemVazia.style.display = 'block'

    } else {

        mensagemVazia.style.display = 'none'

    }


    tarefas.forEach((tarefa, index) => {

        let mostrar = false


        if (filtroAtual === 'todas') {

            mostrar = true

        }


        if (
            filtroAtual === 'pendentes'
            &&
            !tarefa.concluida
        ) {

            mostrar = true

        }


        if (
            filtroAtual === 'concluidas'
            &&
            tarefa.concluida
        ) {

            mostrar = true

        }


        if (!mostrar) {

            return

        }


        const li =
            document.createElement('li')


        const textoTarefa =
            document.createElement('p')


        textoTarefa.textContent =
            tarefa.texto


        if (tarefa.concluida) {

            textoTarefa.classList.add(
                'concluida'
            )

        }


        textoTarefa.addEventListener(
            'click',
            () => {

                concluirTarefa(index)

            }
        )


        const botaoExcluir =
            document.createElement('button')


        botaoExcluir.textContent =
            'Excluir'


        botaoExcluir.classList.add(
            'botao-excluir'
        )


        botaoExcluir.addEventListener(
            'click',
            () => {

                deletarTarefa(index)

            }
        )


        li.appendChild(textoTarefa)

        li.appendChild(botaoExcluir)

        lista.appendChild(li)

    })


    atualizarContador()

}


formulario.addEventListener(
    'submit',
    (event) => {

        event.preventDefault()

        adicionarTarefa()

    }
)


botoesFiltro.forEach(botao => {

    botao.addEventListener(
        'click',
        () => {

            botoesFiltro.forEach(
                botao => {

                    botao.classList.remove(
                        'ativo'
                    )

                }
            )


            botao.classList.add('ativo')


            filtroAtual =
                botao.dataset.filtro


            renderizarTarefas()

        }
    )

})

renderizarTarefas()