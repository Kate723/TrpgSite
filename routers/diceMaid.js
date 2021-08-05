var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('diceMaid.ejs',{title:'仲夏前夜-战役骰娘'});
});

module.exports = router;