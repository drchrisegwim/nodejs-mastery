//Express is a fast and light weight framework for building web apps.

//Res= Respresentational State Transfer.

//A framwork gives your application a proper structure
// Express function can be used to carry http verbs such as get, post, put, delete...


const express = require('express');
const app = express();

const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');

//Enabling parsing of json object in the body of the request
app.use(express.json());
// express.urlencoded() middleware passes incoming request with url encoded payloads. eg a url like ...key=value&key=value
app.use(express.urlencoded());
// Another express middleware is known as static. this will help render any static file you put in the root of your app eg. http://localhost:3210/readme.txt
app.use(express.static('public'));

// Calling the hlment middleware 
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// morgan('tiny') is used for logging requests.
app.use(morgan('tiny'));

// One of the core concept in express I need to know is "Middleware" or "Middleware function".
// So in express, every route handler is technically a middleware function. Also express.json() we called ealier is also a middleware function.
// We can also create custom middleware functions as shown below. So an express app is nothing but bunch of middleware functions.
const logger = require('./logger');
app.use(logger.log);

// Note middleware functions are called in sequence.
app.use(logger.auth);




const authors = [{
        id: 1,
        name: 'Christian Egwim '
    },
    {
        id: 2,
        name: 'Mohamed Hamada'
    },
    {
        id: 3,
        name: 'Babatunde Akinkiunmi'
    }
];

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





// Creating new end points using an array of object named authors 
app.get('/api/authors', (req, res) => {
    res.send(authors);
});

app.get('/api/authors/:id', (req, res) => {
    // To get a given author we need to first find it from list of authors using its id.
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) {
        // return 404, ie object not found. 
        return res.status(404).send(`The author with id: ${req.params.id} was not found`);
    }

    res.send(author);
});

// Implementing http POST...
app.post('/api/authors', (req, res) => {
    // Using Joi for validation we first need to create a shema of the object you want it to validate:
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    //console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }




    // // Writing validation yourselve
    // if (!req.body.name || req.body.name < 3) {
    //     //Bad request 
    //     res.status(400).send('Name is required and should be min of 3 characters.');
    //     return;
    // }

    const author = {
        id: authors.length + 1,
        name: req.body.name
    };

    authors.push(author);
    res.send(author);
});


// Implementing an update (PUT) request.
app.put('/api/authors/:id', (req, res) => {
    // Look up for the author
    const author = authors.find(a => a.id === parseInt(req.params.id));
    // if not existing, return 404
    if (!author) {
        return res.status(404).send('Author doesnt exist');
    }

    // Validate 
    // If invalid, return 400 - Bad request.
    const result = validateAuthor(req.body);
    // one can actually rewrite the code above with object destructuring in js as "const {error} = validateAuthor(req.body);"   
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update author.
    author.name = req.body.name;
    // Return the updated author
    res.send(author);
});



app.delete('/api/authors/:id', (req, res) => {

    // Get the author to be deleted
    const author = authors.find(a => a.id === parseInt(req.params.id));

    // Return 404 if author doent exist
    if (!author) {
        return res.status(404).send('Author you want to delete doesnt exist');
    }

    // Remove the author from authors list

    const index = authors.indexOf(author);
    authors.splice(index, 1);

    // Send report to user
    res.send(author);


})

// Never trust what the client sends to you. Always validate every input.
function validateAuthor(author) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(author, schema);
}






//Using enviroment variable to set port dinamically
const port = process.env.PORT || 3210;
app.listen(port, () => console.log(`Listening on port ${port}...`));