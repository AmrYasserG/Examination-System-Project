//handle local & session storage ------------------------------
var users = JSON.parse(localStorage.getItem('users'))
var user = JSON.parse(sessionStorage.getItem('user'))


//handle grading ----------------------------------------------- 
var questions = user.questions;
var userAnswers = user.answers;
var wrongAnswers = [];

for (var i = 0; i < userAnswers.length; i++) {
    var temp = {
        question: questions[i].question,
        userAnswer: userAnswers[i][1],
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


//handle scores -------------------------------------------------
var score = document.getElementById('overall-score');
score.textContent = `${(10 - wrongAnswers.length) * 10}%`;

var corrAnswersScore = document.getElementById('correct-score');
corrAnswersScore.textContent = 10 - wrongAnswers.length;

var wrongAnswersScore = document.getElementById('wrong-score');
wrongAnswersScore.textContent = wrongAnswers.length;

var pieChart = document.getElementById('pie-chart');

if (wrongAnswers.length == 0)
    pieChart.style.background = `conic-gradient(var(--correct) 0% 100% )`
else if (wrongAnswers.length == 10)
    pieChart.style.background = `conic-gradient(var(--error) 0% 100%)`
else
    pieChart.style.background = `conic-gradient(var(--correct) 0% ${(10 - wrongAnswers.length) * 10}% ,var(--error) ${(10 - wrongAnswers.length) * 10}% 100%)`



