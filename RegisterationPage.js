
//theme change ------> light / dark modes
var themeButton = document.getElementById('theme-button');
themeImg = document.getElementById('theme-img')

// localStorage.setItem('theme', 'light');
// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.body.classList.add('dark');
//     themeImg.src = 'assests/sun.png';
//     localStorage.setItem('theme', 'dark');
// }

if (localStorage.theme === 'dark') {
    document.body.classList.add('dark');
    themeImg.src = 'assests/sun.png';
}
else {
    document.body.classList.add('light');
    themeImg.src = 'assests/moon.png';
}

themeButton.onclick = () => {
    document.body.classList.toggle('dark');
    console.log(themeImg.src.split('/')[4]);

    localStorage.setItem('theme',
        document.body.classList.contains('dark') ? 'dark' : 'light');
    if (themeImg.src.split('/')[4] === 'moon.png')
        themeImg.src = 'assests/sun.png';
    else
        themeImg.src = 'assests/moon.png';
};



//validation----------------------------
var fname = document.getElementById('fname-input');
var lname = document.getElementById('lname-input');
var email = document.getElementById('email-input');
var password = document.getElementById('password-input');
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
    if (password.value === "")
        passwordError.textContent = '*Ths Field is Required'
    else if (password.value.length < 8)
        passwordError.textContent = '*Password Needs to be More than 8 Letters'
    else
        passwordError.textContent = ''

    if (password.value !== '' && cpassword.value !== '' && password.value === cpassword.value) {
        cpasswordError.textContent = ''
    }
}
function validateCPass() {
    if (cpassword.value === "")
        cpasswordError.textContent = '*Ths Field is Required'
    else if (cpassword.value !== password.value)
        cpasswordError.textContent = '*Password Does Not Match'
    else
        cpasswordError.textContent = ''
}

function validateSubmission(e) {
    formEvent = e;
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
    if (password.value === '') {
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
        || passwordError.textContent !== ''
        || cpasswordError.textContent !== ''
        || flagEmpty === true) {
        e.preventDefault();
    }
    else {
        addToUsers();
    }
}

//handle questions--------------------------------------
var questions = [
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        answer: "Ottawa"
    },
    {
        question: "Which country has the largest population in the world?",
        choices: ["USA", "India", "China", "Brazil"],
        answer: "India"
    },
    {
        question: "Mount Kilimanjaro is located in which country?",
        choices: ["Kenya", "Tanzania", "Ethiopia", "Uganda"],
        answer: "Tanzania"
    },
    {
        question: "Which river is the longest in the world?",
        choices: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: "Nile River"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "South Korea", "Japan", "Thailand"],
        answer: "Japan"
    },
    {
        question: "Which desert is the largest hot desert in the world?",
        choices: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"],
        answer: "Sahara Desert"
    },
    {
        question: "Which country has the most islands?",
        choices: ["Indonesia", "Philippines", "Sweden", "Norway"],
        answer: "Sweden"
    },
    {
        question: "What is the smallest country in the world?",
        choices: ["Monaco", "Maldives", "Vatican City", "San Marino"],
        answer: "Vatican City"
    },
    {
        question: "Which ocean is the largest?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "The Great Barrier Reef is located in which country?",
        choices: ["USA", "Australia", "Philippines", "Mexico"],
        answer: "Australia"
    }
];

//randomize questions and answers---------------
questions.sort(() => Math.random() - 0.5);
for (let i = 0; i < questions.length; i++) {
    questions[i].choices.sort(() => Math.random() - 0.5);
}

//add users to localStorage -------------------

function addToUsers() {
    var user = {
        fname: (fname.value).trim(),
        lname: (lname.value).trim(),
        email: (email.value).trim(),
        password: (password.value).trim(),
        grade: -1,
        timeLeft: 10 * 60,
        answers: new Array(10),
        markedQuesArr: new Array(10),
        questions: questions,
        currQuestion: 1
    };
    if (localStorage.getItem('users') === null) {
        var users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users))
    }
    else {
        var users = JSON.parse(localStorage.getItem('users'))
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === user.email) {
                formEvent.preventDefault();
                emailError.textContent = '*email already exists';
                return "";
            }
        }
        // sessionStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem('user', JSON.stringify(user));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

    }
}

//add user to sessionStorage-----------------
// function userSession() {
//     var user = {
//         fname: (fname.value).trim(),
//         lname: (lname.value).trim(),
//         email: (email.value).trim(),
//         password: (password.value).trim(),
//         grade: -1,
//         timeLeft: 10 * 60,
//         answers: new Array(10),
//         markedQuesArr: new Array(10),
//         questions: new Array(10)
//     };
//     sessionStorage.setItem('user', JSON.stringify(user));
// }


