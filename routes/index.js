var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Study Group Finder' });
});

/* GET registeration page. */

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Registration', errors: null});
});

/* POST for user information in registration page. */

router.post('/register', function(req, res, next) {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        console.log(JSON.stringify(errors));
        res.render('register', {
            title: 'Registration Error',
            errors: errors
        });
    } else {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const db = require('../db.js');

        bcrypt.hash(password, saltRounds, function(err, hash) {
            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function (error, results, fields) {
                if (error){
                    console.log(error);
                    res.render('register', {
                        title: 'Registration Database Error',
                        errors: null
                    });
                } else {
                    res.render('register', { title: 'Registration Complete' });
                }
            })
        })
    }
})

module.exports = router;
