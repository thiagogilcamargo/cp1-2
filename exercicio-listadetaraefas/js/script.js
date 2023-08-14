document.addEventListener('DOMContentLoaded', function() {
    const tarefas = [];

    function adicionarTarefa() {
        const descricao = document.getElementById('descricao').value;
        const autor = document.getElementById('autor').value;
        const departamento = document.getElementById('departamento').value;
        const importancia = parseInt(document.getElementById('importancia').value);

        if (!descricao || !autor || !departamento || isNaN(importancia) || importancia < 1 || importancia > 5) {
            alert('Preencha todos os campos corretamente. A importância deve ser um número de 1 a 5.');
            return;
        }

        tarefas.push({ descricao, autor, departamento, importancia });

        exibirTarefas();
        limparCampos();
    }

    function exibirTarefas() {
        const listaTarefas = document.getElementById('tarefas');
        listaTarefas.innerHTML = '';

        tarefas.forEach((tarefa, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tarefa.descricao}</td>
                <td>${tarefa.autor}</td>
                <td>${tarefa.departamento}</td>
                <td>${tarefa.importancia}</td>
                <td><button onclick="removerTarefa(${index})">Remover</button></td>
            `;
            listaTarefas.appendChild(row);
        });
    }

    function removerTarefa(index) {
        tarefas.splice(index, 1);
        exibirTarefas();
    }

    function ordenarPorImportancia() {
        tarefas.sort((a, b) => b.importancia - a.importancia);
        exibirTarefas();
    }

    function limparCampos() {
        document.getElementById('descricao').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('importancia').value = '';
    }

    // Configurar event listeners para botões
    const adicionarBotao = document.getElementById('adicionarBotao');
    adicionarBotao.addEventListener('click', adicionarTarefa);

    const ordenarBotao = document.getElementById('ordenarBotao');
    ordenarBotao.addEventListener('click', ordenarPorImportancia);

    // Inicializa a exibição das tarefas
    exibirTarefas();
});
