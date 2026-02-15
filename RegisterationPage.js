
//theme change ------> light / dark modes
var themeButton = document.getElementById('theme-button');
themeImg = document.getElementById('theme-img')

// localStorage.setItem('theme', 'light');
// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.body.classList.add('dark');
//     themeImg.src = '/assests/sun.png';
//     localStorage.setItem('theme', 'dark');
// }

if (localStorage.theme === 'dark') {
    document.body.classList.add('dark');
    themeImg.src = '/assests/sun.png';
}
else {
    document.body.classList.add('light');
    themeImg.src = '/assests/moon.png';
}

themeButton.onclick = () => {
    document.body.classList.toggle('dark');
    console.log(themeImg.src.split('/')[4]);

    localStorage.setItem('theme',
        document.body.classList.contains('dark') ? 'dark' : 'light');
    if (themeImg.src.split('/')[4] === 'moon.png')
        themeImg.src = '/assests/sun.png';
    else
        themeImg.src = '/assests/moon.png';
};



//validation----------------------------
var fname = document.getElementById('fname-input');
var lname = document.getElementById('lname-input');
var email = document.getElementById('email-input');
var password1 = document.getElementById('password-input');
var cpassword = document.getElementById('cpassword-input');

var fnameError = document.getElementById('fname-error');
var lnameError = document.getElementById('lname-error');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var cpasswordError = document.getElementById('cpassword-error');


function validateFName() {
    const containsNumCheck = /\d/;
    if (fname.value === "")
        fnameError.textContent = '*Ths Field is Required'
    else if (isFinite(fname.value))
        fnameError.textContent = '*First Name Can Not be a Number'
    else if (containsNumCheck.test(fname.value))
        fnameError.textContent = '*First Name Can Not Contain a Number'
    else
        fnameError.textContent = ''
}
function validateLName() {
    const containsNumCheck = /\d/;
    if (lname.value === "")
        lnameError.textContent = '*Ths Field is Required'
    else if (isFinite(lname.value))
        lnameError.textContent = '*Last Name Can Not be a Number'
    else if (containsNumCheck.test(lname.value))
        lnameError.textContent = '*Last Name Can Not Contain a Number'
    else
        lnameError.textContent = ''
}

function validateEmail() {
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value === "")
        emailError.textContent = '*Ths Field is Required'
    else if (!(checkEmail.test(email.value)))
        emailError.textContent = '*Email Not Valid'
    else
        emailError.textContent = ''
}
function validatePass() {
    if (password1.value === "")
        passwordError.textContent = '*Ths Field is Required'
    else if (password1.value.length < 8)
        passwordError.textContent = '*Password Needs to be More than 8 Letters'
    else
        passwordError.textContent = ''
}
function validateCPass() {
    if (cpassword.value === "")
        cpasswordError.textContent = '*Ths Field is Required'
    else if (cpassword.value !== password1.value)
        cpasswordError.textContent = '*Password Does Not Match'
    else
        cpasswordError.textContent = ''
}

function validateSubmission(e) {
    var flagEmpty = false;
    if (fname.value === '') {
        flagEmpty = true
        validateFName();
    }
    if (lname.value === '') {
        flagEmpty = true
        validateLName();
    }
    if (email.value === '') {
        flagEmpty = true
        validateEmail();
    }
    if (password1.value === '') {
        flagEmpty = true
        validatePass();
    }
    if (cpassword.value === '') {
        flagEmpty = true
        validateCPass();
    }
    if (fnameError.textContent !== ''
        || lnameError.textContent !== ''
        || emailError.textContent !== ''
        || mobileError.textContent !== ''
        || passwordError.textContent !== ''
        || cpasswordError.textContent !== ''
        || flagEmpty === true) {
        e.preventDefault();
    }
    // else{
    //     //add user to json file
    // }
}