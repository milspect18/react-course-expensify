const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is my resolved data');    // Only takes a single arg!
        reject('Rjected biotch!');
    }, 5000);
});

console.log('Before');

promise.then((data) => {    // Then called for successful resolve
    console.log(data);
}).catch((err) => {     // catch will be called if the promise rejects
    console.log('Error: ', err);
});

console.log('After');
