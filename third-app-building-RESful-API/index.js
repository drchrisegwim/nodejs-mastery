//Express is a fast and light weight framework for building web apps.

//Res= Respresentational State Transfer.

//A framwork gives your application a proper structure
// Express function can be used to carry http verbs such as get, post, put, delete...


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!!!');
}); // The call back function above is also called a route handler

app.get('/api/courses', (req, res) => {
    res.send([3, 2, 1]);
});


// to get a specific couse by its Id:
app.get('/api/courses/:id', (req, res) => {

    // to read the id we use the params method:
    res.send(req.params.id);
});

//To return year and month.
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

//This is to read value of a query string eg. /api/posts/2018?name=emeksense
app.get('/api/posts/:year/', (req, res) => {
    res.send(req.query);
});

//Using enviroment variable to set port dinamically
const port = process.env.PORT || 3210;
app.listen(port, () => console.log(`Listening on port ${port}...`));