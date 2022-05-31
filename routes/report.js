var express = require('express');
const conn = require('../lib/db');
var router = express.Router();

router.get('/', function (req, res, next) {

    res.render('report', {
        page_title: 'Welcome to your Report',
      
    });
});

router.post('/view',(req,res)=>{
    let id = req.body.id
    sql = `SELECT 
    st.id,
    st.first_nm,
    st.last_nm,
	st.class,
	su.subject,
    gt.term1_grd,
    gt.term2_grd,
    gt.term3_grd,
    avg(term1_grd) As term1_avg,
    avg(term2_grd) As term2_avg,
    avg(term3_grd) As term3_avg
FROM
    grades gt,
    subjects su,
	students st
where su.id = gt.subject_id
And st.id = gt.student_id
and st.id like '${id}'`

conn.query(sql,(err,rows)=>{
    if(err) throw err

    res.render('reportView',{
        report: rows

    })
    console.log(rows)
    
})
})



module.exports = router;