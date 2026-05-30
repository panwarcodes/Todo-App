const form = document.querySelector('.tasks');
const input = document.querySelector('.taskInput');
const taskStorage = document.querySelector('.taskStorage')

// for rendering existing tasks 
taskLoader();

// listening to add button 

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value === "") {
        window.alert('Please enter a task first!');
    }
    else {
        taskAdder(input.value);
        form.reset();
    }

})

// global task list

const taskList = [];

// task adder for newly create tasks

function taskAdder(valueToAdd) {
    console.log("before:", taskList);
    const array_old = JSON.parse(localStorage.getItem("tasks"));
    // adding new first task for initilization if it's user's first visit
    if (array_old === null) {
        taskList.push(valueToAdd);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    // adding more tasks after initializing first task
    else {
        taskList.length = 0;
        for (i = 0; i < array_old.length; i++) {
            taskList.push(array_old[i]);
        }

        // taskList.length = 0;
        taskList.push(valueToAdd);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    const array = JSON.parse(localStorage.getItem("tasks"));

    uiInstructor(array);
}

// rendering UI using arrays for both newly added tasks and older tasks in the localStorage

function uiInstructor(array) {
    console.log("rendering", array);
    // console.log(array);
    taskStorage.replaceChildren();

    for (let i = 0; i < array.length; i++) {

        const Inside_tasks_Div = document.createElement('div');
        Inside_tasks_Div.classList.add('Inside_tasks_div');

        const taskname = document.createElement('p');
        taskname.classList.add('taskTEXT');
        taskname.textContent = array[i];

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
        editInput.defaultValue = array[i];

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
        });

        function saveEdit() {
            return saveButton.addEventListener('click', () => {
                editInput.remove();
                saveButton.remove();

                array[i] = editInput.value;
                localStorage.setItem("tasks", JSON.stringify(array));
                uiInstructor(array);
            })
        };

        deleteButton.addEventListener('click', () => {
            const arrayStored = JSON.parse(localStorage.getItem("tasks"));
            arrayStored.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(arrayStored));
            Inside_tasks_Div.remove();
            uiInstructor(arrayStored);
        });


    }
}

// extracts task data from localStorage and calls uiInstructor()

function taskLoader() {
    const arrayGet = JSON.parse(localStorage.getItem("tasks"));
    if (arrayGet === null) {
        return
    }
    else {
        uiInstructor(arrayGet);
    }
}