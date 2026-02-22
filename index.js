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

 var openModalBtn = document.getElementById('openModal');
    var modal = document.getElementById('examModal');
    var cancelBtn = document.getElementById('cancelModal');

    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

        modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

