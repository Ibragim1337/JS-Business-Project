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
          const desc1 = a.description.toLowerCase();
          const desc2 = b.description.toLowerCase();
          if (desc1 > desc2) return 1;
          if (desc1 < desc2) return -1;
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
  #taskController;
  #budget;
  constructor(initialBalance = 0){
    this.#taskController = new TaskController();
    this.#budget = {
      balance: initialBalance,
      income: 12,
      expenses: 10
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
}




console.clear();

const task1 = new Task ('', "НАлоги", 5000);
const bdg = new BudgetController()

console.log(task1);