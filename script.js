const dashboard = document.getElementById('dashboard');

// Conteúdo dinâmico para cada menu
const data = {
    home: [
        { title: "Boas-vindas", content: "Organize sua vida aqui!" },
        { title: "Dica do dia", content: "Planeje suas tarefas diárias." }
    ],
    financeiro: [
        { title: "Gastos Mensais", content: "R$ 2.500,00" },
        { title: "Economias", content: "R$ 10.000,00" }
    ],
    academia: [
        { title: "Treinos Semanais", content: "4/5 Concluídos" },
        { title: "Meta", content: "Ganhar 3kg de massa magra." }
    ],
    estudos: [
        { title: "Horas de Estudo", content: "15h esta semana" },
        { title: "Próximo Curso", content: "JavaScript Avançado" }
    ],
    projetos: [
        { title: "Projetos Ativos", content: "3" },
        { title: "Deadline Próximo", content: "Site pessoal - 15/08" }
    ],
    negocios: [
        { title: "Novos Clientes", content: "5 este mês" },
        { title: "Faturamento", content: "R$ 20.000,00" }
    ],
    planner: [
        { title: "Tarefas Concluídas", content: "8/10" },
        { title: "Meta da Semana", content: "Completar todas as tarefas." }
    ],
    notificacoes: [
        { title: "Novas Notificações", content: "2 pendentes" },
        { title: "Lembretes", content: "Reunião amanhã às 14h" }
    ],
    configuracoes: [
        { title: "Configurações", content: "Tudo está em ordem!" }
    ],
    ajuda: [
        { title: "Suporte", content: "Estamos aqui para ajudar!" }
    ]
};

// Função para atualizar a dashboard
function showDashboard(section) {
    dashboard.innerHTML = ''; // Limpa o conteúdo atual
    const items = data[section];
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${item.title}</h3><p>${item.content}</p>`;
        dashboard.appendChild(card);
    });
}

function showDashboard(section) {
    const sections = document.querySelectorAll('[id$="-section"]');
    sections.forEach(sec => sec.style.display = 'none');

    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Limpa a dashboard principal

    // Mostrar a aba correta
    if (section === 'estudos') {
        document.getElementById('estudos-section').style.display = 'block';
    } else {
        const items = data[section];
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${item.title}</h3><p>${item.content}</p>`;
            dashboard.appendChild(card);
        });
    }
}

// Atualização do progresso ao clicar
document.querySelectorAll('.task-list input[type="checkbox"]').forEach(task => {
    task.addEventListener('change', () => {
        const completedTasks = document.querySelectorAll('.task-list input:checked').length;
        const totalTasks = document.querySelectorAll('.task-list input').length;
        const progressPercentage = (completedTasks / totalTasks) * 100;

        document.querySelector('.progress').style.width = progressPercentage + '%';
        document.querySelector('.progress').textContent = Math.round(progressPercentage) + '%';
    });
});


// Seletores
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoItems = document.getElementById('todo-items');

// Função para carregar tarefas do localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todoItems.innerHTML = ''; // Limpar lista antes de renderizar

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">${todo.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button onclick="deleteTodo(${index})">Excluir</button>
            </div>
        `;
        todoItems.appendChild(li);
    });
}

// Função para salvar tarefas no localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Função para adicionar uma nova tarefa
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = { text, completed: false };
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);

    saveTodos(todos);
    loadTodos();
    todoForm.reset();
});

// Função para marcar ou desmarcar uma tarefa como concluída
function toggleComplete(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;

    saveTodos(todos);
    loadTodos();
}

// Função para excluir uma tarefa
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);

    saveTodos(todos);
    loadTodos();
}

// Carregar tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadTodos);

