const form = document.querySelector('.tasks');
const input = document.querySelector('.taskInput');
const taskStorage = document.querySelector('.taskStorage')

// random index generate for localStorage task as it requires key value pairs 

function randomNum(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}


// listening to add button 

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value === "") {
        window.alert('Please enter a task first!');
    }
    else {
        taskHandler(input.value);
        form.reset();
    }
})


for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const task_tobeLoaded = localStorage.getItem(key);
    loaderTask(key);
}

// task loading from localStorage after page refresh

function loaderTask(key) {
    const Inside_tasks_Div = document.createElement('div');
    Inside_tasks_Div.classList.add('Inside_tasks_div');

    const taskname = document.createElement('p');
    taskname.classList.add('taskTEXT');
    taskname.textContent = localStorage.getItem(key);

    taskStorage.appendChild(Inside_tasks_Div);
    Inside_tasks_Div.appendChild(taskname);

    const buttonStorage = document.createElement('div');
    buttonStorage.classList.add('buttonStorage');

    Inside_tasks_Div.appendChild(buttonStorage);

    const editButton = document.createElement('button');
    editButton.classList.add('editButton')
    editButton.textContent = "Edit";
    buttonStorage.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton')
    deleteButton.textContent = "Delete";
    buttonStorage.appendChild(deleteButton);

    const editInput = document.createElement('input');
    editInput.classList.add('editInput')
    editInput.defaultValue = localStorage.getItem(key);

    const saveButton = document.createElement('button');
    saveButton.classList.add('saveButton');
    saveButton.textContent = 'Save';

    editButton.addEventListener('click', (event) => {
        taskname.remove();
        editButton.remove();
        deleteButton.remove();
        buttonStorage.remove();
        Inside_tasks_Div.appendChild(editInput);
        Inside_tasks_Div.appendChild(saveButton);
        event.preventDefault();
        saveEdit();
    })

    function saveEdit() {
        return saveButton.addEventListener('click', () => {
            editInput.remove();
            saveButton.remove();
            localStorage.setItem(key, editInput.value);
            const edited = localStorage.getItem(key);
            taskname.textContent = edited;
            Inside_tasks_Div.appendChild(taskname); 
            Inside_tasks_Div.appendChild(buttonStorage);
            buttonStorage.appendChild(editButton);
            buttonStorage.appendChild(deleteButton);
        })
    }

    deleteButton.setAttribute('data-index', key);
    deleteButton.addEventListener('click', () => {
        const indexToDelete = event.target.getAttribute('data-index');
        localStorage.removeItem(indexToDelete);
        Inside_tasks_Div.remove();
    });

}

// task handler function

function taskHandler(task) {
    const taskIndex = randomNum(1, 100000);
    localStorage.setItem(taskIndex, task);

    const Inside_tasks_Div = document.createElement('div');
    Inside_tasks_Div.classList.add('Inside_tasks_div');

    const taskname = document.createElement('p');
    taskname.classList.add('taskTEXT');
    taskname.textContent = localStorage.getItem(taskIndex);

    taskStorage.appendChild(Inside_tasks_Div);
    Inside_tasks_Div.appendChild(taskname);

    const buttonStorage = document.createElement('div');
    buttonStorage.classList.add('buttonStorage');

    Inside_tasks_Div.appendChild(buttonStorage);

    const editButton = document.createElement('button');
    editButton.classList.add('editButton')
    editButton.textContent = "Edit";
    buttonStorage.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton')
    deleteButton.textContent = "Delete";
    buttonStorage.appendChild(deleteButton);

    const editInput = document.createElement('input');
    editInput.classList.add('editInput')
    editInput.defaultValue = localStorage.getItem(taskIndex);

    const saveButton = document.createElement('button');
    saveButton.classList.add('saveButton');
    saveButton.textContent = 'Save';

    editButton.addEventListener('click', (event) => {
        taskname.remove();
        editButton.remove();
        deleteButton.remove();
        buttonStorage.remove();
        Inside_tasks_Div.appendChild(editInput);
        Inside_tasks_Div.appendChild(saveButton);
        event.preventDefault();
        saveEdit();
    })

    function saveEdit() {
        return saveButton.addEventListener('click', () => {
            editInput.remove();
            saveButton.remove();
            localStorage.setItem(taskIndex, editInput.value);
            const edited = localStorage.getItem(taskIndex);
            taskname.textContent = edited;
            Inside_tasks_Div.prepend(taskname);
            Inside_tasks_Div.appendChild(buttonStorage);
            buttonStorage.appendChild(editButton);
            buttonStorage.appendChild(deleteButton);
        })
    }

    deleteButton.setAttribute('data-index', taskIndex);
    deleteButton.addEventListener('click', () => {
        const indexToDelete = event.target.getAttribute('data-index');
        localStorage.removeItem(indexToDelete);
        Inside_tasks_Div.remove();
    });


}

