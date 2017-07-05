interface UserInfo{
    user:string,
    password:string
}
declare var chrome:any,Cookies:any;
function loadUserInfo(){
    var id = Cookies.get('userId');
    var password = Cookies.get('userPassword');
    return {
        user: id,
        password: password
    };
}
function saveUserInfo(userInfo:UserInfo){
     Cookies.set('userId',userInfo.user , { expires: 365 * 10 });
     Cookies.set('userPassword',userInfo.password , { expires: 365 * 10 });
}

(async()=>{    
    var userInput = <HTMLInputElement>document.getElementsByName("user")[0];
    var passwordInput = <HTMLInputElement>document.getElementsByName("password")[0];
    var form = <HTMLFormElement>document.getElementsByTagName("Form")[0];
    if(!userInput || !passwordInput)return;

    var error = document.getElementById("errorbox");
    var userInfo = await loadUserInfo();
    if(!userInfo.user || error){//init
        userInfo.user = window.prompt("請輸入帳號",userInfo.user);
        userInfo.password = window.prompt("請輸入密碼",userInfo.password);

        saveUserInfo(userInfo);
    }
    
    userInput.value = userInfo.user;
    passwordInput.value = userInfo.password;

    if(error)return;

    form.submit();
})();