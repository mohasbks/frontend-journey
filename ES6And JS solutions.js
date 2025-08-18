let x = 5;
x = 10;
console.log(x);

const y = 15;

console.log(a);
var a = 5;
console.log(a);

let b = 10;
console.log(b);

const add = (num1, num2) => num1 + num2;
console.log(add(5, 3));

const multiply = (a, b) => {
  const result = a * b;
  return result;
};

const myName = "Sarah";
const myAge = 25;
console.log(`My name is ${myName} and I am ${myAge} years old`);

const greet = (name = "Guest") => {
  console.log(`Hello, ${name}!`);
};
greet();
greet("Ahmed");

const person = { firstName: "Ali", age: 22 };
const { firstName, age } = person;
console.log(firstName);
console.log(age);

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first, second, rest);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);

const obj1 = { name: "John", age: 30 };
const obj2 = { city: "Cairo", country: "Egypt" };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

const getMax = (...nums) => Math.max(...nums);
console.log(getMax(10, 5, 8, 3, 12));

const name = "Mohamed";
const age = 30;
const user = {
  name,
  age,
  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  },
  [`greeting_${name}`]: "Hello there"
};
user.sayHi();
console.log(user);

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
  
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 10);
console.log(`Area: ${rect.area()}`);
console.log(`Perimeter: ${rect.perimeter()}`);

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

const square = new Square(4);
console.log(`Square area: ${square.area()}`);

const delayedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done!");
  }, 2000);
});

delayedPromise.then(message => {
  console.log(message);
});

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
      if (success) {
        resolve({ data: "User data", id: 123 });
      } else {
        reject(new Error("Failed to fetch"));
      }
    }, 1000);
  });
};

fetchData()
  .then(data => console.log("Success:", data))
  .catch(error => console.log("Error:", error.message));

const asyncFunction = async () => {
  try {
    const result = await delayedPromise;
    console.log("Async result:", result);
  } catch (error) {
    console.log("Async error:", error);
  }
};

asyncFunction();
