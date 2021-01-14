const todoInupt = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(e){
    e.preventDefault();
    // Create todo div
    const todoDiv = document.createElement("div");
    //Add class todo to div
    todoDiv.classList.add("todo");
    //Create element LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInupt.value;
    //Add CLASS to the new LI
    newTodo.classList.add('todo-item');
    //Append LI to DIV
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage
    saveLocalTodos(todoInupt.value);
    //Append buttons to DIV
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append div to UL
    todoList.appendChild(todoDiv);
    //Clear todo input field
    todoInupt.value = '';
}

function deleteOrCheck(e) {
    const item = e.target;

    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    //Add class todo to div
    todoDiv.classList.add("todo");
    //Create element LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    //Add CLASS to the new LI
    newTodo.classList.add('todo-item');
    //Append LI to DIV
    todoDiv.appendChild(newTodo);
    //Append buttons to DIV
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append div to UL
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}