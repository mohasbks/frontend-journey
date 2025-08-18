const delayedPromise = new Promise(resolve => {
  setTimeout(() => resolve("Hello, World!"), 2000);
});

delayedPromise.then(value => console.log(value));

const numberPromise = Promise.resolve(5)
  .then(num => num * 2)
  .then(num => num - 3)
  .then(result => console.log(result));

const rejectedPromise = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong!"));
});

rejectedPromise.catch(error => console.log(error.message));
