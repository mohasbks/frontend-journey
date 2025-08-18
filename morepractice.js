let shoppingCart = ["apple", "bread", "milk"];
shoppingCart.push("banana");
shoppingCart = [...shoppingCart, "discount: SAVE10"];

const fixedCart = ["apple", "bread"];

const calculateTax = (price) => price * 1.15;

console.log(calculateTax(100));
console.log(calculateTax(250));
console.log(calculateTax(500));

const logStudentGrade = (name, grade) => {
    console.log(`Student ${name} has scoreed ${grade}% in the final exam.`);
};

logStudentGrade("Alice", 92);

const applyDiscount = (price, discount = 0.1) => price - (price * discount);

console.log(applyDiscount(100));
console.log(applyDiscount(100, 0.2));

const book = { title: "Book", author: "John Doe", price: 200 };
const { title, price } = book;
console.log(`The ${title} costs ${price}`);

const subjects1 = ["Math", "English"];
const subjects2 = ["Science", "History"];
const subjects = [...subjects1, ...subjects2];
subjects.push("PE");
console.log(subjects);

const maxNumber = (...nums) => Math.max(...nums);
console.log(maxNumber(5, 10, 3, 20, 15));

const student = {
    name: "Sarah",
    grade: "A",
    introduce() {
        console.log(`Hi, I'm ${this.name} and my grade is ${this.grade}`);
    }
};
student.introduce();

class BankAccount {
    constructor(initialBalance = 0) {
        this.balance = initialBalance;
    }
    
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. Balance: ${this.balance}`);
    }
    
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. Balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds");
        }
    }
}

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
account.withdraw(200);

const fetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Ali" });
        }, 1500);
    });
};

fetchUser().then(user => {
    console.log(`User found: ${user.name}`);
});
