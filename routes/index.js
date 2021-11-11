// Modules

require('dotenv').config(); // AWS
const express = require('express');
const router = express.Router();

let user = null;

let connectionString = process.env.CONN_STRING;

const profiles = [
    { name: 'Mike', city: 'Sydney', profession: 'doctor'},
    { name: 'Cindy', city: 'Perth'},
    { name: 'Joe', city: 'Sydney', profession: 'programmer'}
];


// Routes

// Home
router.get('/', (req, res, next) => {
    
    const data = {
        connectionString: connectionString,
        name: 'Index',
        date: req.timestamp,
        profiles: profiles,
        user: user
    };
    res.render('index', data);

});

router.get('/login', (req, res, next) => {

    res.render('login', null);

});

router.post('/login', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    if(password === '123') {
        user = { username: username };
        res.redirect('/');
        return;
    }

    /*res.json({
        data: 'failed login'
    });*/

    const data = {
        message: 'Please check your password and/or username.'
    };
    res.render('error', data);

})

router.post('/join', (req, res, next) => {

    const body = req.body;
    profiles.push(body);

    res.redirect('/');
})

// JSON
router.get('/json', (req, res, next) => {

    const data = { 
        name: 'David',
        location: 'Sydney',
        date: req.timestamp
    }
    res.json(data);

});

//HTML
router.get('/html', (req, res, next) => {
    
    const html = '<html><h1>This is an HTML response</h1></html>';
    
    res.send(html);

});

// Query String
router.get('/query', (req, res, next) => {

    const query = req.query;
    res.json(query);

});

// Route params
router.get('/params/:name/:location/:occupation', (req, res, next) => {

    const params = req.params;
    res.json({
        params: params
    });

});


// Export

module.exports = router;
