// Array para armazenar as tarefas
const tarefas = [];

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    // Obtém os valores dos campos do formulário
    const descricao = document.getElementById('descricao').value;
    const autor = document.getElementById('autor').value;
    const departamento = document.getElementById('departamento').value;
    const importancia = parseInt(document.getElementById('importancia').value);

    // Validação dos campos do formulário
    if (!descricao || !autor || !departamento || isNaN(importancia) || importancia < 1 || importancia > 5) {
        alert('Preencha todos os campos corretamente. A importância deve ser um número de 1 a 5.');
        return;
    }

    // Adiciona a tarefa ao array de tarefas
    tarefas.push({ descricao, autor, departamento, importancia });

    // Atualiza a exibição das tarefas na tabela
    exibirTarefas();

    // Limpa os campos do formulário após adicionar uma tarefa
    limparCampos();
}

// Função para exibir as tarefas na tabela
function exibirTarefas() {
    const listaTarefas = document.getElementById('tarefas');
    listaTarefas.innerHTML = '';

    // Percorre o array de tarefas e cria uma linha na tabela para cada tarefa
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

// Função para remover uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1); // Remove a tarefa do array pelo índice
    exibirTarefas(); // Atualiza a exibição das tarefas na tabela
}

// Função para ordenar as tarefas por importância (do maior para o menor)
function ordenarPorImportancia() {
    tarefas.sort((a, b) => b.importancia - a.importancia);
    exibirTarefas();
}

// Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById('descricao').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById('importancia').value = '';
}

// Inicializa a exibição das tarefas ao carregar a página
exibirTarefas();
