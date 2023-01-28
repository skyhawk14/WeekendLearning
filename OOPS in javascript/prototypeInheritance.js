const Person = function(name, age){
  this.name = name;
  this.age =  age;
}
Person.prototype.hasOwnProperty = function () {
    return true
}
const jason = new Person('jason', 22)
console.log(jason)
console.log(jason.hasOwnProperty())
