var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calculatePercentage = function(totalIncome) {

    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = 0;
    }
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }


  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  }

  var data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function(type, desc, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
          ID = 0;
      }

      // ID = 0;

      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);

      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      data.allItems[type].push(newItem);

      // console.log(data);

      return newItem;
    },

    deleteItem: function(type, ID) {


      ids = data.allItems[type].map(function(current){
        return current.id;
      })

      index = ids.indexOf(ID);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }

    },

    calculateBudget: function() {

      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      //calculate the budget: income - expense
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage of income that we spend
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {

      data.allItems.exp.forEach(function(current) {
        current.calculatePercentage(data.totals.inc);
      });

    },

    getPercentages: function() {

      var allPercentages = data.allItems.exp.map(function(current) {
        return current.getPercentage();
      });

      return allPercentages;

    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
    }

  }

})();

var UIController = (function() {

  DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputSubmit: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLable: '.budget__value',
    incomeLable: '.budget__income--value',
    expensesLable: '.budget__expenses--value',
    percentageLable: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLable: '.item__percentage'
  };

  return {
    getInput: function() {

      return {
        addType: document.querySelector(DOMStrings.inputType).value,
        addDescription: document.querySelector(DOMStrings.inputDescription).value,
        addValue: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, element;
      //create HTML string
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;

        html = `<div class="item clearfix" id="inc-${obj.id}">
                  <div class="item__description">${obj.description}</div>
                  <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__delete">
                      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                  </div>
                </div>`;
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;

        html = `<div class="item clearfix" id="exp-${obj.id}">
                  <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                      <div class="item__value">- ${obj.value}</div>
                      <div class="item__percentage">21%</div>
                      <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                    </div>
                </div>`;
      }      //insert HTML to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    deleteListItem: function(selectorID) {
      var element = document.getElementById(selectorID);

      element.parentNode.removeChild(element);

    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });
      // debugger;
      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMStrings.budgetLable).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLable).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLable).textContent = obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLable).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLable).textContent = '--';
      }
    },

    displayPercentages: function(percentages) {

      var fields = document.querySelectorAll(DOMStrings.expensesPercLable);

      var nodeListForEach = function(list, callback) {

        for (var i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      }

      nodeListForEach(fields, function(current, index) {

        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%'
        } else {
          current.textContent = '-'
        }
      });
    },

    getDOMStrings: function(){
      return DOMStrings;
    }
  }


})();

var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputSubmit).addEventListener('click', controllerAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        ControllerAddItem();
      }
    })

    document.querySelector(DOM.container).addEventListener('click', controllerDeleteItem);
  };

  var updatePercentages = function() {

    // calculate percentages
    budgetCtrl.calculatePercentages();
    // read from budget controller
    var percentages = budgetCtrl.getPercentages();
    // update UI
    UICtrl.displayPercentages(percentages);

  }

  var updateBudget = function() {

    // calculate budget
    budgetCtrl.calculateBudget();
    // return budget
    var budget = budgetCtrl.getBudget();
    //display budget
    UICtrl.displayBudget(budget);

  }

  var controllerAddItem = function() {
    var input, newItem

    // getting value of inputs from UI
    input = UICtrl.getInput();
    // debugger;
    if (input.addDescription !== '' && !isNaN(input.addValue) && input.addValue > 0) {
      // adding item to the budget controller
      newItem = budgetCtrl.addItem(input.addType, input.addDescription, input.addValue);

      // adding item to the UI
      UIController.addListItem(newItem, input.addType);

      // clear fields
      UIController.clearFields();

      // update budget
      updateBudget();

      updatePercentages();
    }

  };

  var controllerDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {

      splitID = itemID.split('-')
      type = splitID[0];
      ID = parseInt(splitID[1]);
      // console.log(splitID);

      // delete item from database
      budgetCtrl.deleteItem(type, ID);
      // update ui
      UIController.deleteListItem(itemID);
      // update budget
      updateBudget();

      updatePercentages();

    }

  }

  return {
    init: function() {
      console.log('something');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();
