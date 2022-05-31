var express = require('express')
var router = express.Router();
var conn = require('../lib/db');

router.get('/', (req, res) => {
    res.render('login', {
        title: 'login',
        email: '',
        password: ''

    })

})


router.post('/authLogin', (req, res) => {
    var email = req.body.email
    var password = req.body.password;

    conn.query('SELECT * FORM excercise1.users WHERE email = ?  AND BINARY ?', [email, password], (err, rows, fields) => {

        if (rows.length <= 0) {
            req.flash('error', 'Invalid credentials Please try again!')
            res.redirect('/login')
        } else {

            req.session.loggedin = true;
            req.session.first_nm = rows[0].first_name;
            req.session.last_nm = rows[0].last_nm;
            req.session.user_type = rows[0].user_type;
            console.log(req.session);
            res.redirect('/');

        }

    })

})

module.exports = router