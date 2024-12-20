// Atualizar o contador de dias até o concurso
const contestDate = new Date("2024-08-01");
const currentDate = new Date();
const daysLeft = Math.ceil((contestDate - currentDate) / (1000 * 60 * 60 * 24));

document.getElementById('days-left').textContent = daysLeft;

// Funcionalidade para o botão de visualização de resumos (exemplo básico)
const viewNotesBtns = document.querySelectorAll('.view-notes');

viewNotesBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        alert("Você pode adicionar, editar ou visualizar o resumo aqui.");
    });
});

// Selecionando elementos do DOM
const addNoteBtn = document.getElementById('add-note-btn');
const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

// Exibir ou ocultar o formulário
if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
        if (noteForm) {
            noteForm.style.display = noteForm.style.display === 'none' ? 'block' : 'none';
        } else {
            console.error("O elemento 'note-form' não foi encontrado no DOM.");
        }
    });
}

// Função para carregar anotações do localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // Limpa a lista antes de renderizar

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('notes-card');
        noteCard.innerHTML = `
            <h3>${note.materia} - ${note.conteudo}</h3>
            <p><strong>Data:</strong> ${note.data}</p>
            <p><strong>Resumo:</strong> ${note.resumo}</p>
            <button onclick="deleteNote(${index})">Excluir</button>
        `;
        notesList.appendChild(noteCard);
    });
}

// Função para salvar anotações
if (noteForm) {
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coletar dados do formulário
        const materia = document.getElementById('materia').value;
        const conteudo = document.getElementById('conteudo').value;
        const resumo = document.getElementById('resumo').value;
        const data = document.getElementById('data').value;

        const newNote = { materia, conteudo, resumo, data };

        // Recuperar anotações salvas e adicionar a nova
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(newNote);

        // Salvar de volta no localStorage
        localStorage.setItem('notes', JSON.stringify(notes));

        // Atualizar a exibição e limpar o formulário
        loadNotes();
        noteForm.reset();
        noteForm.style.display = 'none';
    });
}

// Função para excluir anotações
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Carregar as anotações ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    if (notesList) {
        loadNotes();
    } else {
        console.error("O elemento 'notes-list' não foi encontrado no DOM.");
    }
});


// Selecionar todas as células editáveis
const editableCells = document.querySelectorAll('td[contenteditable="true"]');

// Função para salvar dados no localStorage
function saveSchedule(day, column, value) {
    const schedule = JSON.parse(localStorage.getItem('weeklySchedule')) || {};

    if (!schedule[day]) {
        schedule[day] = {};
    }

    schedule[day][column] = value;
    localStorage.setItem('weeklySchedule', JSON.stringify(schedule));
}

// Função para carregar dados do localStorage
function loadSchedule() {
    const schedule = JSON.parse(localStorage.getItem('weeklySchedule')) || {};

    editableCells.forEach(cell => {
        const day = cell.getAttribute('data-day');
        const column = cell.getAttribute('data-column');

        if (schedule[day] && schedule[day][column]) {
            cell.textContent = schedule[day][column];
        }
    });
}

// Adicionar eventos para salvar alterações
editableCells.forEach(cell => {
    cell.addEventListener('blur', () => {
        const day = cell.getAttribute('data-day');
        const column = cell.getAttribute('data-column');
        const value = cell.textContent.trim();

        saveSchedule(day, column, value);
    });

    cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar quebra de linha
            cell.blur(); // Simular o evento de perda de foco
        }
    });
});

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', loadSchedule);




// Seletores
const addSubjectBtn = document.getElementById('add-subject-btn');
const subjectForm = document.getElementById('subject-form');
const cancelSubjectBtn = document.getElementById('cancel-subject-btn');
const subjectTableBody = document.getElementById('subject-table-body');

// Função para carregar matérias do localStorage
function loadSubjects() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];

    subjectTableBody.innerHTML = ''; // Limpar tabela antes de renderizar

    subjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true" data-index="${index}" data-field="name">${subject.name}</td>
            <td contenteditable="true" data-index="${index}" data-field="teacher">${subject.teacher}</td>
            <td contenteditable="true" data-index="${index}" data-field="hours">${subject.hours}</td>
            <td contenteditable="true" data-index="${index}" data-field="notes">${subject.notes}</td>
            <td>
                <button onclick="deleteSubject(${index})">Excluir</button>
            </td>
        `;
        subjectTableBody.appendChild(row);
    });
}

// Função para salvar matérias no localStorage
function saveSubjects(subjects) {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Função para adicionar uma nova matéria
subjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('subject-name').value;
    const teacher = document.getElementById('subject-teacher').value || '';
    const hours = document.getElementById('subject-hours').value || 0;
    const notes = document.getElementById('subject-notes').value || '';

    const newSubject = { name, teacher, hours, notes };

    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.push(newSubject);
    saveSubjects(subjects);

    loadSubjects();
    subjectForm.reset();
    subjectForm.style.display = 'none';
});

// Função para excluir uma matéria
function deleteSubject(index) {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.splice(index, 1);
    saveSubjects(subjects);
    loadSubjects();
}

// Função para editar diretamente na tabela
subjectTableBody.addEventListener('blur', (e) => {
    if (e.target.tagName === 'TD' && e.target.hasAttribute('data-index')) {
        const index = e.target.getAttribute('data-index');
        const field = e.target.getAttribute('data-field');
        const value = e.target.textContent.trim();

        const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
        subjects[index][field] = value;
        saveSubjects(subjects);
    }
}, true);

// Mostrar/ocultar formulário de nova matéria
addSubjectBtn.addEventListener('click', () => {
    subjectForm.style.display = 'block';
});

cancelSubjectBtn.addEventListener('click', () => {
    subjectForm.style.display = 'none';
});

// Carregar matérias ao iniciar
document.addEventListener('DOMContentLoaded', loadSubjects);


function openTab(tabName) {
    // Ocultar todas as abas
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        pane.style.display = 'none';
    });

    // Mostrar a aba selecionada
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}

