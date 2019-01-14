// Here we show how to use Promise that is already resolved. Useful when you wan to mock an object eg during unit test.
const p = Promise.resolve({
    id: 1
});

p.then(result => console.log(result));


// For calling promise thats already rejected 
//const pr = Promise.reject(new Error('Error occured!!!'));
//p.catch(err => console.log(err.message));

// Runing Parallel Promises

// 1. Say for fbook
const pp1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Asyn operation 1...');
        resolve(1);
    }, 2000);
});

// 2. say for twitter
const pp2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Asyn operation 2.....');
        resolve(2);
    }, 2000);
});

// Calling both pp1 and pp2 to run in parallel
Promise.all([pp1, pp2])
    .then(result => console.log(result));