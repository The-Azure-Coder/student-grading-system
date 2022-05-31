var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    res.render('index', {
        page_title: 'Welcome to Grades',
        my_session: req.session
    });
    next();
});

module.exports = router;