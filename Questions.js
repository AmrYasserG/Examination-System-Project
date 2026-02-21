
//handle local storage----------------
var users = JSON.parse(localStorage.getItem('users'))
var user = JSON.parse(localStorage.getItem('user'))

function updateUser() {
    localStorage.setItem('user', JSON.stringify(user));
}
function updateUsers() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === user.email) {
            users[i] = user;
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
}

//questions-------------------------------------
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
var answers = user.answers;
var markedQuesArr = user.markedQuesArr;



//randomize questions and answers---------------
// questions.sort(() => Math.random() - 0.5);
// for (let i = 0; i < questions.length; i++) {
//     questions[i].choices.sort(() => Math.random() - 0.5);
// }

//handle timer & progress bar --------------------
var mins = document.getElementById('timer-mins');
var secs = document.getElementById('timer-secs');
var progressBar = document.getElementById('progress-bar');
var totalTime = 10 * 60;        //10mins 
var timeLeft = Number(user.timeLeft);
function updateTime() {
    mins.style.setProperty('--value', Math.floor(timeLeft / 60));
    secs.style.setProperty('--value', timeLeft % 60);
    timeLeft--;
}
function handleProgressBar() {
    progressBar.value = (timeLeft / totalTime) * 100;
    var flag2Thirds = false;
    var flagThird = false;
    if (!flag2Thirds && timeLeft <= 2 * (totalTime / 3)) {
        flag2Thirds = true;
        progressBar.classList.add('progress-warning')
    }
    if (!flagThird && timeLeft <= (totalTime / 3)) {
        flagThird = true;
        progressBar.classList.add('progress-error');

    }
}

var interval = setInterval(() => {
    if (timeLeft >= 0) {
        handleProgressBar();
        updateTime();
        user.timeLeft = timeLeft;
        updateUser();
        updateUsers()
    }
    else {
        clearInterval(interval);
        window.location.replace('ResultPage.html');


    }
}, 1000)

//handle choice logic------------------------------
var input1 = document.getElementById('input-1');
var input2 = document.getElementById('input-2');
var input3 = document.getElementById('input-3');
var input4 = document.getElementById('input-4');
function selectAnswer(input) {
    input1.checked = false;
    input2.checked = false;
    input3.checked = false;
    input4.checked = false;
    if (input != null) {
        answers[Number(questionNum.textContent) - 1] = [input.id.split('-')[1], input.labels[0].textContent]
        user.answers = answers;
        document.getElementById(`input-${input.id.split('-')[1]}`).checked = true;
    }
    else {
        if (answers[[Number(questionNum.textContent) - 1]] != null)
            document.getElementById(`input-${answers[Number(questionNum.textContent) - 1][0]}`).checked = true;
    }
}

//handle buttons from overview------------------
function selectButton(num) {
    var buttonTemp = document.getElementById(`question-${num}-button`)
    buttonTemp.classList.remove('border-gray-300', 'hover:bg-gray-300', 'bg-green-100', 'border-green-500');
    buttonTemp.classList.add('bg-blue-200', 'border-blue-700');
}
function unselectButton(num) {
    var buttonTemp = document.getElementById(`question-${num}-button`)
    buttonTemp.classList.remove('bg-blue-200', 'border-blue-700', 'bg-green-100', 'border-green-500');
    buttonTemp.classList.add('border-gray-300', 'hover:bg-gray-300');
}
function answeredButton(num) {
    var buttonTemp = document.getElementById(`question-${num}-button`)
    buttonTemp.classList.remove('bg-blue-200', 'border-blue-700', 'border-gray-300', 'hover:bg-gray-300');
    buttonTemp.classList.add('bg-green-100', 'border-green-500');
}
function markAnsweredButtons() {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] != null)
            answeredButton(i + 1);
    }
}


//handle showing questions----------------------
var questionNum = document.getElementById('question-num');
var questionText = document.getElementById('question-text');
var choice1 = document.getElementById('choice-1');
var choice2 = document.getElementById('choice-2');
var choice3 = document.getElementById('choice-3');
var choice4 = document.getElementById('choice-4');

function showQuestion(num) {
    user.currQuestion = Number(num);
    if (questionNum.textContent != '')
        unselectButton(questionNum.textContent);
    questionNum.textContent = num;
    questionText.textContent = questions[num - 1].question;
    choice1.textContent = questions[num - 1].choices[0];
    choice2.textContent = questions[num - 1].choices[1];
    choice3.textContent = questions[num - 1].choices[2];
    choice4.textContent = questions[num - 1].choices[3];
    markAnsweredButtons();
    selectButton(num);
    selectAnswer(null);
    handleMarkedQuesButtons();
}
showQuestion(user.currQuestion);


//handle mark button-----------------------------
var markButton = document.getElementById('mark-button');
var markedButton = document.getElementById('marked-button');

markButton.addEventListener('click', function () {
    mark();
    addMarkedQues(questionNum.textContent);
})
markedButton.addEventListener('click', function () {
    unmark();
    removeMarkedQues(questionNum.textContent);
})

function mark() {
    markButton.classList.add('hidden');
    markedButton.classList.remove('hidden');
}
function unmark() {
    markButton.classList.remove('hidden');
    markedButton.classList.add('hidden');
}

function addMarkedQues(num) {
    if (document.getElementById('Q' + num) == null) {
        var container = document.getElementById('marked-ques-container');
        var markedQuesButton = document.createElement('button');
        markedQuesButton.classList.add("w-12", "h-12", "border-1", "border-gray-300", "rounded-xl", "hover:bg-gray-300", "active:bg-transparent");
        markedQuesButton.id = 'Q' + num;
        markedQuesButton.textContent = 'Q' + num;
        markedQuesButton.addEventListener('click', function () {
            showQuestion((this.id).split('Q')[1]);
            mark();
        });
        markedQuesArr[Number(num) - 1] = true;
        markedQuesArr = user.markedQuesArr;
        container.append(markedQuesButton);
    }
}
function removeMarkedQues(num) {
    var markedQuesButton = document.getElementById('Q' + num);
    markedQuesButton.remove();
    markedQuesArr[Number(num) - 1] = false;
    markedQuesArr = user.markedQuesArr;
}

function handleMarkedQuesButtons() {
    for (var i = 0; i < markedQuesArr.length; i++) {
        if (markedQuesArr[i] === true)
            addMarkedQues(i + 1);
    }
}

//handle next and prev buttons--------------------
var nextQues = document.getElementById('next-ques');
var prevQues = document.getElementById('prev-ques');

nextQues.addEventListener('click', function () {
    input1.checked = false;
    input2.checked = false;
    input3.checked = false;
    input4.checked = false;
    var currQues = Number(questionNum.textContent);
    if (currQues < 10) {
        showQuestion(currQues + 1)
    }
    if (markedQuesArr[Number(questionNum.textContent) - 1] == true)
        mark();
    else
        unmark()
})
prevQues.addEventListener('click', function () {
    input1.checked = false;
    input2.checked = false;
    input3.checked = false;
    input4.checked = false;
    var currQues = Number(questionNum.textContent);
    if (currQues > 1) {
        showQuestion(currQues - 1)
    }
    if (markedQuesArr[Number(questionNum.textContent) - 1] == true)
        mark();
    else
        unmark();
})

//handle submit button -----------------------------------
var submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function () {
    var unansweredQuestions = [];
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] == null)
            unansweredQuestions.push(i + 1);
    }
    if (unansweredQuestions.length > 0) {
        var temp = '';
        for (var i = 0; i < unansweredQuestions.length; i++) {
            if (i == 0)
                temp = 'question ' + unansweredQuestions[i];
            else
                temp += ', question ' + unansweredQuestions[i];
        }
        var confirmText = 'You have not answered all the questions.\nQuestions which are not answered:\n';
        confirmText += temp + '\n';
        confirmText += 'Are u sure you want to submit?';
        var userChoice = confirm(confirmText);
        console.log(userChoice);
        if (userChoice) {
            window.location.replace('ResultPage.html');
        }
    }

})



