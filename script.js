
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const editButton = document.querySelector('.edit')

let currentIndex=0


let todos = []

todoButton.addEventListener('click',addTodo)
document.addEventListener('DOMContentLoaded', getTodoListOnLoad)


function addTodo(e){
    e.preventDefault()
    if (todoInput.value=="") return false
    if (todoButton.innerText !="ADD"){
        todos[currentIndex]=todoInput.value
        refreshItems();
        todoButton.innerText='ADD'
        todoInput.value=""
        return false
    } 
    
    
    createItem(todoInput.value, todos.length)
    

    saveToLocalStorage(todoInput.value)
    todoInput.value=""
}

    function saveToLocalStorage(todo){
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
    }

function getTodoListOnLoad(){
    if(localStorage.getItem('todos')){
    todos =JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo, index)=> {
        createItem(todo, index)
    })
}

function createItem (todo, index){
    let todoDiv = document.createElement('div')
    todoList.appendChild(todoDiv)
    let editBtn = document.createElement('button')
    let delBtn = document.createElement('button')
    
    let newTodo = document.createElement('li')
    newTodo.innerText = todo
    todoDiv.appendChild(newTodo)
    editBtn.innerText="Edit";
    editBtn.className="edit";
    delBtn.innerText="Delete";
    delBtn.className="delete";

    delBtn.id=index;
    editBtn.id=index;

        newTodo.appendChild(delBtn); 
        newTodo.appendChild(editBtn);


}

document.addEventListener('click', check)
function check(e){
if(e.target.className == 'delete'){
    todos.splice(e.target.id, 1)
    e.target.parentNode.remove() // delete the event
    refreshItems()
} // access by class name
if(e.target.className == 'edit'){
    todoInput.value=todos[e.target.id]
    todoButton.innerText='Edit'
    currentIndex=e.target.id
         refreshItems()
 } // access by class name
 
}


function refreshItems(){
    todoList.innerHTML=""
    localStorage.setItem('todos', JSON.stringify(todos))
    getTodoListOnLoad()

}