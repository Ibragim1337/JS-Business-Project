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

class ExspenseTask extends Task {
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

  addTask(...tasks) {
    for (const task of tasks) {
      if(task instanceof Task) {
        this.#tasks.push(task);
      } else {
        throw new Error('Такое поле уже существует!');
      }
    }
  }

  getTasks(){
  return this.#tasks;
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
}


