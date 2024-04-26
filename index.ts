#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
let todoList: string[] = [];
let conditions = true;

console.log(chalk.bgBlue.bold(`<<<<<<<<=================>>>>>>>>`));
console.log(chalk.bold.bgYellow.white(`Welcome to the project, Todo-List`));
console.log(chalk.bgBlue.bold(`<<<<<<<<=================>>>>>>>>`));

let todos = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option :",
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      conditions = false;
    }
  }
};

// function to add tasks to the list:
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter the task name in Todo-List Application :",
    },
  ]);
  todoList.push(newTask.task);
  console.log(
    chalk.bgGreen(`${newTask.task} Task has been added successfully`)
  );
};

// function to delete tasks from the list:
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Enter the 'index no.' of the task you want to delete :",
    },
  ]);
  let deleteTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(
    chalk.bgGreen(
      `${deleteTask} this task has been deleted successfully from your Todo-List Application.`
    )
  );
};

// function to update tasks from the list:
let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the 'index no.' of the task you want to update :",
    },
    {
      name: "new_task",
      type: "input",
      message: "Now enter the new task name :",
    },
  ]);
  todoList[update_task_index.index - 1] = update_task_index.new_task;
  console.log(
    chalk.bgGreen(
      `Task at index no. ${
        update_task_index.index - 1
      } updated successfully [for updated list check option: "View Todo-List"] `
    )
  );
};

// function to view tasks from the list:
let viewTask = () => {
  console.log(chalk.bgGreen(`Your Todo-List Application`));
  todoList.forEach((task, index) => {
    console.log(chalk.bgGreen(`${index + 1}: ${task}`));
  });
};
todos();
