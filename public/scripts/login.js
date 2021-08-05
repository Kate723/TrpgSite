function submit(){
    console.log('login clicked');
    var usrName = document.getElementsByName('usrName')[0].value;
    var usrPwd = document.getElementsByName('usrPwd')[0].value;

    usrPwd = CryptoJS.SHA256(usrPwd).toString();

    // console.log('get username:' + usrName + '\nget password:' + usrPwd);

    fetch('/auth',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({usrName:usrName,usrPwd:usrPwd})
    })
}
