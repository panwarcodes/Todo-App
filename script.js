const form = document.querySelector('.tasks');
const input = document.querySelector('.taskInput');
const taskStorage = document.querySelector('.taskStorage')

// listening to main textarea element for dynamic height adjustment

input.addEventListener("input", () => {
    // Reset height to calculate fresh scroll height
    input.style.height = "auto";

    // Set new height based on internal text content height
    input.style.height = input.scrollHeight + "px";
});

// for rendering existing tasks 

taskLoader();

// listening to add button 

form.addEventListener('submit', (event) => {
    input.style.height = "auto";
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
        taskList.push({
            task: valueToAdd,
            isCompleted: false
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    // adding more tasks after initializing first task
    else {
        taskList.length = 0;
        for (let i = 0; i < array_old.length; i++) {
            taskList.push(array_old[i]);
        }

        taskList.push({
            task: valueToAdd,
            isCompleted: false
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    const array = JSON.parse(localStorage.getItem("tasks"));

    uiInstructor(array);
}

// live UI rendering using arrays for both newly added tasks and older tasks in the localStorage

function uiInstructor(array) {
    console.log("rendering", array);
    // console.log(array);
    taskStorage.replaceChildren();

    for (let i = 0; i < array.length; i++) {

        const Inside_tasks_Div = document.createElement('div');
        Inside_tasks_Div.classList.add('Inside_tasks_div');

        const taskname = document.createElement('p');
        taskname.classList.add('taskTEXT');
        taskname.textContent = array[i].task;

        const taskStatus = document.createElement('button');
        taskStatus.classList.add('taskStatus');

        taskStorage.appendChild(Inside_tasks_Div);
        Inside_tasks_Div.appendChild(taskStatus);
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

        const editInput = document.createElement('textarea');
        editInput.classList.add('editInput');
        editInput.setAttribute('placeholder', 'Type here...');
        editInput.setAttribute('rows', '1');
        editInput.defaultValue = array[i].task;

        const saveButton = document.createElement('button');
        saveButton.classList.add('saveButton');
        saveButton.textContent = 'Save';

        taskStatus.addEventListener('click', () => {
            if (array[i].isCompleted === false) {
                array[i].isCompleted = true;
                localStorage.setItem("tasks", JSON.stringify(array));
            }
            else if (array[i].isCompleted === true) {
                array[i].isCompleted = false;
                localStorage.setItem("tasks", JSON.stringify(array));
            }
            uiInstructor(array);
        })

        editButton.addEventListener('click', (event) => {
            taskname.remove();
            editButton.remove();
            deleteButton.remove();
            buttonStorage.remove();
            taskStatus.remove();
            Inside_tasks_Div.appendChild(editInput);
            Inside_tasks_Div.appendChild(saveButton);
            event.preventDefault();

            // Reset height to calculate fresh scroll height
            editInput.style.height = "auto";

            // Set new height based on internal text content height
            editInput.style.height = editInput.scrollHeight + "px";

            saveEdit();
        });

        function saveEdit() {
            saveButton.addEventListener('click', () => {
                editInput.remove();
                saveButton.remove();

                array[i].task = editInput.value;
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
        if (array[i].isCompleted === false) {
            taskStatus.textContent = "➕";
        }
        else {
            taskStatus.textContent = "✅";
            taskname.style.textDecoration = "line-through";
            taskname.style.opacity = "0.7";
            editButton.remove();
            taskname.style.width = "19.1em";
        }
    }
}

// extracts task data from localStorage and calls uiInstructor() for UI rendering

function taskLoader() {
    const arrayGet = JSON.parse(localStorage.getItem("tasks"));
    if (arrayGet === null) {
        return
    }
    else {
        uiInstructor(arrayGet);
    }
}