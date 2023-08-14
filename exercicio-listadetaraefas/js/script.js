document.addEventListener('DOMContentLoaded', function() {
    const tarefas = [];
    const adicionarBotao = document.getElementById('adicionarBotao');
    const listaTarefas = document.getElementById('tarefas');
    const ordenarBotao = document.getElementById('ordenarBotao');

    adicionarBotao.addEventListener('click', () => {
        const descricao = document.getElementById('descricao').value;
        const autor = document.getElementById('autor').value;
        const departamento = document.getElementById('departamento').value;
        const importancia = parseInt(document.getElementById('importancia').value);
        const valor = parseFloat(document.getElementById('valor').value) || null; // Campo valor
        const duracao = document.getElementById('duracao').value || null; // Campo duração

        if (!descricao || !autor || !departamento || isNaN(importancia) || importancia < 1 || importancia > 5) {
            alert('Preencha todos os campos corretamente. A importância deve ser um número de 1 a 5.');
            return;
        }

        tarefas.push({ descricao, autor, departamento, importancia, valor, duracao });

        exibirTarefas();
        limparCampos();
    });

    function exibirTarefas() {
        listaTarefas.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tarefa.descricao}</td>
                <td>${tarefa.autor}</td>
                <td>${tarefa.departamento}</td>
                <td>${tarefa.importancia}</td>
                <td>${tarefa.valor !== null ? tarefa.valor : 'N/A'}</td>
                <td>${tarefa.duracao !== null ? tarefa.duracao : 'N/A'}</td>
                <td><button class="remover-button" data-index="${index}">Remover</button></td>
            `;
            listaTarefas.appendChild(row);
        });
    }

    listaTarefas.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remover-button')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            tarefas.splice(index, 1);
            exibirTarefas();
        }
    });

    ordenarBotao.addEventListener('click', () => {
        tarefas.sort((a, b) => b.importancia - a.importancia);
        exibirTarefas();
    });

    function limparCampos() {
        document.getElementById('descricao').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('importancia').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('duracao').value = '';
    }

    exibirTarefas();
});
