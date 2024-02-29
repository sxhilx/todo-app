const todoList = JSON.parse(localStorage.getItem('todoList')) || []

renderTodoList();

function renderTodoList(){
  let todoListHTML = ''

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">Delete</button>   
    `;
    todoListHTML += html;
  })
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML

  
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

const inputElement =  document.querySelector('.js-name-input');
function addTodo(){
  
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input')
  const date = dateInputElement.value

  let emptyElement = document.querySelector('.js-empty-list');
  if ( name === ''){
    emptyElement.innerHTML = 'List cannot be empty.'
  } else{
    todoList.push({
      name: name,
      dueDate: date
    });

    inputElement.value = ''

    renderTodoList();

    saveToStorage()

    emptyElement.innerHTML = ''
}
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === 'Enter'){
    addTodo()
  }
})

function saveToStorage(){
  localStorage.setItem('todoList',JSON.stringify(todoList))
}