//handle user in sessionStorage------------------------------
var user = JSON.parse(sessionStorage.getItem('user'));

if (user == null)
    window.location.replace('LoginPage.html');


// handle sign out-------------------------------------------
var signOutBtn = document.getElementById('sign-out');
signOutBtn.addEventListener('click', function () {
    sessionStorage.removeItem('user');

    window.location.replace('LoginPage.html');
});
