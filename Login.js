
var email = document.getElementById('email-input');
var password = document.getElementById('password-input');

var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');

var loginForm = document.getElementById('loginForm');




function validateEmail() {
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value.trim() === "")
        emailError.textContent = '*This Field is Required'
    else if (!(checkEmail.test(email.value)))
        emailError.textContent = '*Email Not Valid'
    else
        emailError.textContent = ''
}

function validatePass() {
    if (password.value.trim() === "")
        passwordError.textContent = '*This Field is Required'
    else
        passwordError.textContent = ''
}



function validateLogin(e) {

    e.preventDefault();

    validateEmail();
    validatePass();

    if (emailError.textContent !== '' || passwordError.textContent !== '') {
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = null;

    for (var i = 0; i < users.length; i++) {

        if (users[i].email === email.value.trim()
            && users[i].password === password.value.trim()) {

            foundUser = users[i];
            break;
        }
    }

    if (foundUser !== null) {

       
        sessionStorage.setItem('user', JSON.stringify(foundUser));

       
        window.location.href = "index.html";

    } else {
        emailError.textContent = '*Invalid Email or Password';
    }
}


loginForm.addEventListener('submit', validateLogin);
