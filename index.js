function Task (id, description, cost){
  if(!(this instanceof Task)) {
    throw new Error ("Функция должна быть вызвана при помощи 'New'")
  }

  const _id = id;
  const _description = description;
  let _cost = cost;

  Object.defineProperty(this, 'id', {
    get: function() {
      return _id;
    }
  });

  Object.defineProperty(this, 'description', {
    get: function() {
      return _description;
    }
  });

  Object.defineProperty(this, 'cost', {
    get: function() {
      return _cost;
    }
  });

  if(_cost < 0){
    throw new Error('Стоимость должна быть 0')
  }
}

