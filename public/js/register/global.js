function validate() {
    var psw = document.forms["register"]["password"].value;
    var cfpsw = document.forms["register"]["confirmpassword"].value;
    var email = document.forms["register"]["email"].value;
    var firstName = document.forms["register"]["firstname"].value;
    var lastName = document.forms["register"]["lastname"].value;
    var username = document.forms["register"]["username"].value;
    console.log(psw, confirm, email);
    if (firstName === "") {
        document.getElementById("firstname").style.border = "solid 0.5px red";
        $("#firstname").focus();
        return false;
    } else {
        document.getElementById("firstname").style.border = "none";
    }
    if (lastName === "") {
        document.getElementById("lastname").style.border = "solid 0.5px red";
        $("#lastname").focus();
        return false;
    } else
        document.getElementById("lastname").style.border = "none";
    if (email === "") {
        document.getElementById("email").style.border = "solid 0.5px red";
        $("#email").focus();
        return false;
    } else
        document.getElementById("email").style.border = "none";
    if (username === "") {
        document.getElementById("username").style.border = "solid 0.5px red";
        $("#username").focus();
        return false;
    } else
        document.getElementById("username").style.border = "none";
    if (psw.length < 6) {
        document.getElementById("password").style.border = "solid 0.5px red";
        $("#password").focus();
        return false;
    } else
        document.getElementById("password").style.border = "none";
    if (psw !== cfpsw) {
        document.getElementById("confirmpassword").style.border = "solid 0.5px red";
        $("#confirmpassword").focus();
        return false;
    } else
        document.getElementById("confirmpassword").style.border = "none";
    return true;
}