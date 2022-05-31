var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/', function (req, res, next) {
    let varSQL = `SELECT 
    gt.id,
    gt.student_id,
    gt.subject_id,
    gt.term1_grd,
    gt.term2_grd,
    gt.term3_grd,
    su.subject
FROM
    grades gt,
    subjects su
where su.id = gt.subject_id`;

    conn.query(varSQL, function (err, rows) {
        if (err) {
            
        } else {
            res.render('grades-list', {
                data: rows
            });
        }
    });
});

router.get('/edit/:id', function (req, res, next) {
    let varSQL = "SELECT * FROM excercise1.grades WHERE id=" + req.params.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
            //
        } else {
            res.render('grade-edit', {
                page_title: 'grades - Edit',
                data: rows[0]
            });
        }
    });
});

router.post('/update', function (req, res, next) {
    let varSQL = "UPDATE excercise1.grades SET term1_grd ='" + req.body.term1_grd +
        "', term2_grd='" + req.body.term2_grd +
        "', term3_grd ='" + req.body.term3_grd+
        "' WHERE id=" + req.body.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
         
            console.log(err);
        } else {
            res.redirect('/grades');
        }
    });
});


router.get('/delete/:id', function (req, res, next) {
    let varSQL = "DELETE FROM excercise1.grades WHERE id=" + req.params.id;

    conn.query(varSQL, function (err, rows) {
        if (err) {
        
            console.log(err);
        } else {
            res.redirect('/grades');
        }
    });
});


router.get('/create', function (req, res, next) {

    res.render('grade-add', {
        page_title: 'grades Create'
    });

});



router.post('/add', function (req, res, next) {
   let data = {
       student_id: req.body.student_id,
       subject_id: req.body.subject_id,
       term1_grd: req.body.term1_grd,
       term2_grd: req.body.term2_grd,
       term3_grd: req.body.term3_grd
   }

   let query = `INSERT INTO grades SET ?`

    conn.query(query, data, function (err, rows) {
        if (err) {
            //
            console.log(err);
        } else {
            res.redirect('/grades');
        }
    });
});



module.exports = router;