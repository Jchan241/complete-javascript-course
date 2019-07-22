// var firstName = 'johnny';
// var lastName = 'Chan';
// var age = 24;

// var fullAge = true;
// var job;

// console.log(firstName, lastName, "is", age, "years old");

/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/

var mark = {
  fullName: 'Mark',
  mass: 50,
  height: 1.60,
  calcbmi: function() {
    this.bmi = this.mass / (this.height * this.height)
    return this.bmi
  }
};

var john = {
  fullName: 'John',
  mass: 65,
  height: 1.70,
  calcbmi: function () {
    this.bmi = this.mass / (this.height * this.height)
    return this.bmi
  }
};

mark.calcbmi();
john.calcbmi();

console.log(mark.bmi);
console.log(john.bmi);
