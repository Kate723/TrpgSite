var express = require('express');
var router = express.Router();

router.post('/',function(req,res){
	var usrPwd = req.body.usrPwd;
	var usrName = req.body.usrName;

    // console.log('Username:' + usrName);
    // console.log('Password:' + usrPwd);
})

module.exports = router;