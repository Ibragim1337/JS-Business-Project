function Task (id, description, cost){
  if(!(this instanceof Task)) {
    throw new Error ("Функция должна быть вызвана при помощи 'New'")
  }

  this._id = "id" + Math.random().toString(16).slice(2);
  if (typeof description === "string") {
    this._description = description;
  } else {
    throw new Error ("Значение должно быть строкой")
  }
 
  if (typeof cost === "number" && cost >= 0 ){
    this._cost = cost;
  } else {
    throw new Error ("Значение должно быть число и больше 0")
  }
  
  Object.defineProperty(this, 'id', {
    get: function() {
      return id;
    }
  });

  Object.defineProperty(this, 'description', {
    get: function() {
      return description;
    }
  });

  Object.defineProperty(this, 'cost', {
    get: function() {
      return cost;
    }
  });

  if(cost < 0){
    throw new Error('Стоимость должна быть 0')
  }
}


class IncomeTask extends Task {
  constructor(id, description, cost){
    super (id, description, cost);
  }

  makeDone(budget){
    budget.income += this._cost;
  }

  makeUnDone(budget){
    budget.income -= this._cost;
  }
}

class ExpenseTask extends Task {
  constructor(id, description, cost){
    super (id, description, cost);
  }
   makeDone(){
    budget.expenses += this._cost;
  }

  makeUnDone(){
    budget.expenses -= this._cost;
  }
}

class TaskController {
  #tasks;
  constructor () {
    this.#tasks = [];
  }

  addTasks(...tasks) {
    tasks.forEach((task) => {
        if (!this.#tasks.includes(task)) {
            this.#tasks.push(task);
        }
    });
}

  deleteTask(task) {
  const index = this.#tasks.findIndex(function(t) {
    return t.id === task.id;
  });

  if (index !== -1) {
    this.#tasks.splice(index, 1);
  }
}

getTasksSortedBy(sortBy) {
  return [...this.tasks].sort(function(a, b) {
      if (sortBy === 'description') {
          const description1 = a.description.toLowerCase();
          const description2 = b.description.toLowerCase();
          if (description1 > description2) return 1;
          if (description1 < description2) return -1;
      } else if (sortBy === 'status') {
          if (a.status && typeof a.status === 'string' && b.status && typeof b.status === 'string') {
              const status1 = a.status.toLowerCase();
              const status2 = b.status.toLowerCase();
              if (status1 > status2) return 1;
              if (status1 < status2) return -1;
          }
      } else if (sortBy === 'cost') {
          return a.cost - b.cost;
      }
      return 0;
  });
}

getFilteredTasks(filter) {
  return this.#tasks.filter(function(task) {
      if (filter.description) {
          if (!task.description.toLowerCase().includes(filter.description.toLowerCase())) {
              return false;
          }
      }

      if (typeof filter.isIncome === 'boolean') {
          if (filter.isIncome && !(task instanceof IncomeTask)) {
              return false;
          }
          if (!filter.isIncome && !(task instanceof ExpenseTask)) {
              return false;
          }
      }

      if (typeof filter.isCompleted === 'boolean') {
          if (filter.isCompleted && !task.isCompleted) {
              return false;
          }
          if (!filter.isCompleted && task.isCompleted) {
              return false;
          }
      }

      return true;
  });
  }
}

class BudgetController {
  #tasksController;
  #budget;
  constructor(initialBalance = 0){
    this.#tasksController = new TaskController();
    this.#budget = {
      balance: initialBalance,
      income: 0,
      expenses: 0
    }
  }
  get balance() {
    return this.#budget.balance;
  }
  get income() {
    return this.#budget.income;
}

  get expenses() {
    return this.#budget.expenses;
}

  calculateBalance() {
  return this.#budget.balance + this.#budget.income - this.#budget.expenses;
}

  getTasks() {
  return this.#tasksController.getTasks();
}

  addTasks(...tasks) {
  this.#tasksController.addTasks(...tasks);
}

deleteTask(task) {
  if (!this.#tasksController.getTasks().includes(task)) {
      console.log(`Task ${task.id} isn't recognized`);
      return;
  }

  if (task.isCompleted) {
      this.unDoneTask(task);
  }

  this.#tasksController.deleteTask(task);
}

doneTask(task) {
  if (!this.#tasksController.getTasks().includes(task)) {
      console.log(`Task ${task.id} isn't recognized`);
      return;
  }

  if (task.isCompleted) {
      console.log('Task is already done');
      return;
  }

  task.makeDone(this.#budget);
}

unDoneTask(task) {
  if (!this.#tasksController.getTasks().includes(task)) {
      console.log(`Task ${task.id} isn't recognized`);
      return;
  }

  if (!task.isCompleted) {
      console.log('Task isn\'t done before');
      return;
  }

  task.makeUnDone(this.#budget);
}

getFilteredTasks(filter) {
  return this.#tasksController.getFilteredTasks(filter);
}

}

console.clear();

const budgetController = new BudgetController(0);
const taskController = new TaskController();
const task1 = new IncomeTask('','Подарок', 500000);
const task4 = new ExpenseTask('','Машина', 120000);

taskController.addTasks(task1, task4);
budgetController.addTasks(task1, task4);
budgetController.doneTask(task1);
budgetController.unDoneTask(task4);

console.log('Current balance:', budgetController.calculateBalance());