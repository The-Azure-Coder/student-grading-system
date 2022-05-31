var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/', function (req, res, next) {
    let varSQL = "SELECT * FROM excercise1.students";

    conn.query(varSQL, function (err, rows) {
        if (err) {
            
        } else {
            res.render('students-list', {
                data: rows
            });
        }
    });
});

router.get('/edit/:id', function (req, res, next) {
    let varSQL = "SELECT * FROM excercise1.students WHERE id=" + req.params.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
            //
        } else {
            res.render('student-edit', {
                page_title: 'Students - Edit',
                data: rows[0]
            });
        }
    });
});

router.post('/update', function (req, res, next) {
    let varSQL = "UPDATE excercise1.students SET first_nm ='" + req.body.txtFirstName +
        "', last_nm ='" + req.body.txtLastName +
        "', class ='" + req.body.txtClass +
        "' WHERE id=" + req.body.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
         
            console.log(err);
        } else {
            res.redirect('/students/list');
        }
    });
});


router.get('/delete/:id', function (req, res, next) {
    let varSQL = "DELETE FROM excercise1.students WHERE id=" + req.params.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
        
            console.log(err);
        } else {
            res.redirect('/students/list');
        }
    });
});


router.get('/create', function (req, res, next) {

    res.render('student-add', {
        page_title: 'Students Create'
    });

});



router.post('/add', function (req, res, next) {
    let varSQL = "INSERT INTO excercise1.students (first_nm, last_nm, class) VALUES('" + req.body.txtFirstName +
        "', '" + req.body.txtLastName +
        "', '" + req.body.txtClass +
        "')";

    conn.query(varSQL, function (err, rows) {
        if (err) {
            //
            console.log(err);
        } else {
            res.redirect('/students');
        }
    });
});



module.exports = router;