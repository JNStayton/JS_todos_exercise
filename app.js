const list = document.querySelector('#list');
const todoInput = document.querySelector('input[name="todoInput"]');
let todos = [];
const storedTodos = JSON.parse(localStorage.getItem('todo list'));

//this one did not work for retrieving the class
// storedTodos.forEach((todo) => {
// 	const li = document.createElement('li');
// 	for (let key in todo) {
// 		li.innerHTML = `${todo[key]}`;
// 	}
// 	list.append(li);
// });

//retrieve localStorage WITH class
//make sure the todo array matches localStorage
if (storedTodos) {
	todos = storedTodos;
	for (let task of storedTodos) {
		let li = document.createElement('li');
		li.innerHTML = task.todo;
		li.className = task.class;
		list.append(li);
	}
}

//mark a todo as complete (cross out the text)
//button to remove a todo that ALSO updates localStorage
list.addEventListener('click', function(e) {
	if (e.target.tagName === 'BUTTON') {
		for (let task of todos) {
			console.log(e.target.parentElement.innerHTML, task.todo);
			if (e.target.parentElement.innerHTML === task.todo) {
				let index = todos.indexOf(task);
				todos.splice(index, 1);
			}
		}
		localStorage.setItem('todo list', JSON.stringify(todos));
		e.target.parentElement.remove();
	} else if (e.target.tagName === 'LI') {
		e.target.classList.toggle('done');
		for (let task of todos) {
			console.log(e.target.innerHTML, task.todo);
			if (e.target.innerHTML === task.todo) {
				task.class = e.target.className;
			}
		}
		localStorage.setItem('todo list', JSON.stringify(todos));
	}
});

//add a new todo
//save todos in localStorage
form.addEventListener('submit', function(e) {
	e.preventDefault();
	const newTodo = makeTodo(todoInput.value);
	todos.push({ todo: newTodo.innerHTML, class: newTodo.className });
	localStorage.setItem('todo list', JSON.stringify(todos));
	list.append(newTodo);
	todoInput.value = '';
});

function makeTodo(newTodo) {
	const todo = document.createElement('li');
	const btn = document.createElement('button');
	todo.innerText = newTodo;
	btn.innerText = 'x';
	btn.setAttribute('class', 'btn');
	todo.append(btn);
	return todo;
}
