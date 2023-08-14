// Este bloco de código é executado quando o DOM (Document Object Model) é totalmente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar as tarefas.
    const tarefas = [];

    // Referências aos elementos HTML.
    const adicionarBotao = document.getElementById('adicionarBotao');
    const listaTarefas = document.getElementById('tarefas');
    const ordenarBotao = document.getElementById('ordenarBotao');
    const valorInput = document.getElementById('valor');
    const duracaoInput = document.getElementById('duracao');

    // Este evento impede a entrada de caracteres inválidos no campo de valor.
    valorInput.addEventListener('input', () => {
        valorInput.value = valorInput.value.replace(/[^0-9.,]/g, ''); // Permite apenas números, vírgulas e pontos
    });

    // Evento para adicionar uma tarefa quando o botão 'Adicionar' é clicado.
    adicionarBotao.addEventListener('click', () => {
        // Coleta informações da tarefa a partir dos campos de entrada.
        const descricao = document.getElementById('descricao').value;
        const autor = document.getElementById('autor').value;
        const departamento = document.getElementById('departamento').value;
        const importancia = parseInt(document.getElementById('importancia').value);
        const valor = valorInput.value !== '' ? parseFloat(valorInput.value.replace(',', '.')) : null;
        const duracao = duracaoInput.value.trim() !== '' ? duracaoInput.value.trim() : null;

        // Verifica se todos os campos foram preenchidos corretamente.
        if (!descricao || !autor || !departamento || isNaN(importancia) || importancia < 1 || importancia > 5) {
            alert('Preencha todos os campos corretamente. A importância deve ser um número de 1 a 5.');
            return;
        }

        // Verifica a validade do formato da duração.
        if (duracao !== null && !validarDuracaoFormato(duracao)) {
            alert('Formato de duração inválido. Use o formato HH:mm - HH:mm ou deixe em branco.');
            return;
        }

        // Adiciona a tarefa ao array de tarefas.
        tarefas.push({ descricao, autor, departamento, importancia, valor, duracao });

        // Atualiza a exibição das tarefas na página e limpa os campos de entrada.
        exibirTarefas();
        limparCampos();
    });

    // Função para exibir as tarefas na tabela.
    function exibirTarefas() {
        listaTarefas.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            // Cria uma nova linha na tabela para cada tarefa.
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tarefa.descricao}</td>
                <td>${tarefa.autor}</td>
                <td>${tarefa.departamento}</td>
                <td>${tarefa.importancia}</td>
                <td>${tarefa.valor !== null ? formatarMoeda(tarefa.valor) : 'N/A'}</td>
                <td>${tarefa.duracao !== null ? formatarHorario(tarefa.duracao) : 'N/A'}</td>
                <td><button class="remover-button" data-index="${index}">Remover</button></td>
            `;
            listaTarefas.appendChild(row);
        });
    }

    // Evento para remover uma tarefa quando o botão 'Remover' é clicado.
    listaTarefas.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remover-button')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            tarefas.splice(index, 1);
            exibirTarefas();
        }
    });

    // Evento para ordenar as tarefas por importância.
    ordenarBotao.addEventListener('click', () => {
        tarefas.sort((a, b) => b.importancia - a.importancia);
        exibirTarefas();
    });

    // Função para limpar os campos de entrada após adicionar uma tarefa.
    function limparCampos() {
        document.getElementById('descricao').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('importancia').value = '';
        valorInput.value = '';
        duracaoInput.value = '';
    }

    // Função para formatar um valor como moeda.
    function formatarMoeda(valor) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }

    // Função para validar o formato da duração.
    function validarDuracaoFormato(duracao) {
        const duracaoRegex = /^(\d{1,2}:\d{2}) - (\d{1,2}:\d{2})$/;
        return duracaoRegex.test(duracao);
    }

    // Função para formatar a duração.
    function formatarHorario(duracao) {
        return duracao;
    }

    // Exibe as tarefas ao carregar a página.
    exibirTarefas();
});

