const prompt = require('prompt-sync')();

// Task class
function Task(name) {
  this.name = name;
  this.state = 'incomplete';
  this.dueDate = '';
  this.priority = '';
}

// Getter and setter for state
Task.prototype.getState = function () {
  return this.state;
};

Task.prototype.setState = function (state) {
  this.state = state;
};

// Getter and setter for due date
Task.prototype.getDueDate = function () {
  return this.dueDate;
};

Task.prototype.setDueDate = function (date) {
  this.dueDate = date;
};

// Getter and setter for priority
Task.prototype.getPriority = function () {
  return this.priority;
};

Task.prototype.setPriority = function (priority) {
  this.priority = priority;
};

// Mark task as complete
Task.prototype.complete = function () {
  this.state = 'complete';
};

// Delete task
Task.prototype.delete = function () {
  this.Task = null;
};

// Task Manager
function TaskManager() {
  this.tasks = [];
}

// Add a new task
TaskManager.prototype.addTask = function (name) {
  const task = new Task(name);
  this.tasks.push(task);
  return task;
};

// Render all tasks
TaskManager.prototype.viewTasks = function () {
  console.log('Task List:');
  this.tasks.forEach((task) => {
    console.log(`Name: ${task.name}`);
    console.log(`State: ${task.state}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Priority: ${task.priority}`);
    console.log('--------------------');
  });
};

// Filter tasks by completion status
TaskManager.prototype.filterTasksByStatus = function (status) {
  return this.tasks.filter((task) => task.state === status);
};

// Sort tasks by due date
TaskManager.prototype.sortTasksByDueDate = function () {
  return this.tasks.sort((task1, task2) => new Date(task1.dueDate) - new Date(task2.dueDate));
};

// Sort tasks by priority
TaskManager.prototype.sortTasksByPriority = function () {
    return this.tasks.sort((task1, task2) => task1.priority - task2.priority);
};

// Create a new instance of TaskManager
const taskManager = new TaskManager();

// Add tasks using user input
function addTask() {
  const name = prompt(`Enter the name for Task : `);
  const task = taskManager.addTask(name);

  const state = prompt(`Enter the state for the task ${name} : `);
  task.setState(state);

  const dueDate = prompt(`Enter the due date for the task ${name} : `);
  task.setDueDate(dueDate);

  const priority = prompt(`Enter the priority for the task ${name} : `);
  task.setPriority(priority);
}
let condition = true
while (condition) {
    let action = prompt(`Select an action:
    1) Add a new task (Enter add)
    2) List all tasks (Enter list)
    3) List completed tasks (Enter completed)
    4) Mark the task as done (Enter name then done)
    5) Delete a task (Enter name then delete)
    6) Sort tasks by the due date (Enter date sort)
    7) Sort tasks by priority (Enter priority sort)
    8) Clear all tasks (Enter clear)
    or press enter to exit\n`);

    switch (action) {
        case "add":
            addTask();
            break;
        case "list":
            // view all tasks
            taskManager.viewTasks();
            break;
        case "Completed":
            // Filter tasks by completion status
            const completedTasks = taskManager.filterTasksByStatus("complete");
            console.log("Completed Tasks:");
            console.log(completedTasks);
            break;
        case "date sort":
            // Sort tasks by due date
            const sortedByDateTasks = taskManager.sortTasksByDueDate();
            console.log("Sorted Tasks:");
            console.log(sortedByDateTasks);
            break;
        case "priority sort":
            // Sort tasks by due date
            const sortedByPriorityTasks = taskManager.sortTasksByPriority();
            console.log("Sorted Tasks:");
            console.log(sortedByPriorityTasks);
            break;
        case "":
            condition = false;
            break;
    }
}