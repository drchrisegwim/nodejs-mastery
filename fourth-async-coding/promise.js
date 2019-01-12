const p = new Promise((resolve, reject) => {
    // Kick off some asyn work
    //...
    setTimeout(() => {
        //resolve(1);
        reject(new Error('message'));
    }, 2000);

    //Or
    // reject(new Error('message'));

});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));