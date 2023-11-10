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



  makeDone(){

  }

  makeUnDone(){

  }
}

class ExspenseTask extends Task {
  constructor(id, description, cost){
    super (id, description, cost);
  }
   makeDone(){

  }

  makeUnDone(){
    
  }
}

class TaskController {
  #tasks;
  constructor () {
    this.#tasks = [];
  }

  addTask(...task) {
  
  }

  getTasks(){
  return this.#tasks;
  }
}

class BudgetController {
  #taskController;
  #budget;
  constructor(){
    this.#taskController;
    this.#budget = {
      balance: initialBalance,
      income: 12,
      expenses: 10
    };

    Object.defineProperty(this, 'expenses', {
      get (){
        return this.#budget.balance;
      }
    });
  }
}