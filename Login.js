if (sessionStorage.getItem('user')) {
    window.location.replace('index.html');
}

var email = document.getElementById('email-input');
var password = document.getElementById('password-input');

var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');

var loginForm = document.getElementById('loginForm');




function validateEmail() {
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValue = email.value.trim();

    if (emailValue === "") {
        emailError.textContent = '*This Field is Required';
        return false;
    } else if (!checkEmail.test(emailValue)) {
        emailError.textContent = '*Email Not Valid';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePass1() {
    if (password.value === "")
        passwordError.textContent = '*Ths Field is Required'
    else if (password.value.length < 8)
        passwordError.textContent = '*Password Needs to be More than 8 Letters'
    else
        passwordError.textContent = ''
}

function validatePass() {
    const passwordValue = password.value.trim();
    if (passwordValue === "") {
        passwordError.textContent = '*This Field is Required';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}



function validateLogin(e) {

    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPassValid = validatePass();

    if (!isEmailValid || !isPassValid) return;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(user => user.email.toLowerCase() === email.value.trim().toLowerCase());

    if (!foundUser) {
        emailError.textContent = '*Email not registered';
        passwordError.textContent = '';
    } else if (foundUser.password !== password.value.trim()) {
        emailError.textContent = '';
        passwordError.textContent = '*Incorrect password';
    } else {

        emailError.textContent = '';
        passwordError.textContent = '';

        sessionStorage.setItem('user', JSON.stringify(foundUser));

        window.location.href = "index.html";


    }

}


email.addEventListener('input', () => emailError.textContent = '');
password.addEventListener('input', () => passwordError.textContent = '');
loginForm.addEventListener('submit', validateLogin);














