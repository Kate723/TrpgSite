var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('test.ejs',{title:'Login',content:'Hello World'});
});

module.exports = router;