//handle local & session storage ------------------------------
var users = JSON.parse(localStorage.getItem('users'))
var user = JSON.parse(sessionStorage.getItem('user'))

if (user == null)
    window.location.replace('LoginPage.html');



// handle sign out-------------------------------------------
var signOutBtn = document.getElementById('sign-out');
signOutBtn.addEventListener('click', function () {
    sessionStorage.removeItem('user');

    window.location.replace('LoginPage.html');
});


//handle grading ----------------------------------------------- 
var questions = user.questions;
var userAnswers = user.answers;
var wrongAnswers = [];

for (var i = 0; i < userAnswers.length; i++) {
    var temp = {
        question: questions[i].question,
        userAnswer: (userAnswers[i] == null) ? null : userAnswers[i][1],
        correctAnswer: questions[i].answer
    };
    if (temp.userAnswer != temp.correctAnswer)
        wrongAnswers.push(temp);
}

user.grade = 10 - wrongAnswers.length;
updateUser();
updateUsers();

function updateUser() {
    sessionStorage.setItem('user', JSON.stringify(user));
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


//display user name----------------------------------------------

var userName = document.getElementById('userName');
userName.textContent = ` ${capitalizeFirstChar(user.fname)} ${capitalizeFirstChar(user.lname)}`

function capitalizeFirstChar(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
//handle scores -------------------------------------------------
var score = document.getElementById('overall-score');
score.textContent = `${(10 - wrongAnswers.length) * 10}%`;

var corrAnswersScore = document.getElementById('correct-score');
corrAnswersScore.textContent = 10 - wrongAnswers.length;

var wrongAnswersScore = document.getElementById('wrong-score');
wrongAnswersScore.textContent = wrongAnswers.length;

var pieChart = document.getElementById('pie-chart');


// if (wrongAnswers.length == 0)
//     pieChart.classList.add("bg-[conic-gradient(theme(colors.green.600)_0%_100%]");
// else if (wrongAnswers.length == 10)
//     pieChart.classList.add("bg-[conic-gradient(theme(colors.red.600)_0%_100%)]");
// else
pieChart.classList.add(`bg-[conic-gradient(theme(colors.green.600)_0%_${(10 - wrongAnswers.length) * 10}%,theme(colors.red.600)_${(10 - wrongAnswers.length) * 10}%_100%)]`);


//handle question correction cards--------------------------------
var container = document.getElementById('ques-correction-container');

if (wrongAnswers.length > 0) {
    for (var i = 0; i < wrongAnswers.length; i++) {
        var card = document.createElement('div');
        card.className = 'w-full bg-red-100 border-l-4 border-red-600 rounded-xl p-5';
        card.innerHTML = `<p id="question" class="font-medium pb-4">
                    Q${i + 1}: ${wrongAnswers[i].question}?
                </p>
                <div class="pl-3">
                    <p class="text-sm text-gray-600">Your Answer:</p>
                    <p class="text-red-600 font-medium pl-2">${wrongAnswers[i].userAnswer == null ? 'Not Answered' : wrongAnswers[i].userAnswer}</p>
                    <p class="text-sm text-gray-600">Correct Answer:</p>
                    <p class="text-green-600 font-medium pl-2">${wrongAnswers[i].correctAnswer}</p>
                </div>`;
        container.append(card);
    }
}
else {
    document.getElementById('Review-questions').remove();
}



