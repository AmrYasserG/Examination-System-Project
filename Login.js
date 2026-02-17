const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    emailError.textContent = "";
    passwordError.textContent = "";

    if (emailInput.value.trim() === "") {
        emailError.textContent = "Username is required";
        isValid = false;
    }

    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    if (isValid) {
    // alert("Login successful 🎉");
    window.location.href = "HomePage.html"; 
}

});
