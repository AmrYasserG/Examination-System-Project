
document.addEventListener("DOMContentLoaded", function () {

   
    let leaderboard = JSON.parse(localStorage.getItem("users")) || [];

 
    leaderboard = leaderboard.filter(user => user.grade > -1);


    leaderboard.sort((a, b) => {

        if (b.grade !== a.grade) {
            return b.grade - a.grade;
        }

        var nameA = (a.fname + " " + a.lname).toLowerCase();
        var nameB = (b.fname + " " + b.lname).toLowerCase();

        return nameA.localeCompare(nameB);
    });

    var leaderboardList = document.getElementById("leaderboardList");

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = `
            <div class="text-center text-gray-400 py-10">
                <p class="text-lg">No results yet.</p>
                <p class="text-sm">Be the first to complete the exam!</p>
            </div>
        `;
    }

    leaderboard.slice(0, 10).forEach((user, index) => {

        var percentage = user.grade * 10;
        var fullName = capitalizeFirstChar(user.fname) + " " + capitalizeFirstChar(user.lname);

        let medal = "";
        if (index === 0) medal = "🥇";
        else if (index === 1) medal = "🥈";
        else if (index === 2) medal = "🥉";

        var div = document.createElement("div");
        div.className = "flex justify-between items-center p-4 rounded-xl bg-gray-100 border border-gray-200";

        div.innerHTML = `
            <div>
                <p class="font-bold">${medal || "#" + (index + 1)} - ${fullName}</p>
                <p class="text-sm text-gray-500">${user.email}</p>
            </div>

            <div class="text-right">
                <p class="text-xl font-bold text-blue-600">${percentage}%</p>
                <p class="text-sm text-gray-500">${user.grade}/10</p>
            </div>
        `;

        leaderboardList.appendChild(div);
    });

    
    
    var currentUser = JSON.parse(sessionStorage.getItem("user"));
    var userRankSection = document.getElementById("userRankSection");

    if (currentUser) {
        var userIndex = leaderboard.findIndex(u => u.email === currentUser.email);

        if (userIndex !== -1) {

            var user = leaderboard[userIndex];
            var percentage = user.grade * 10;

            

            userRankSection.innerHTML = `
                <div class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center mt-4">
                    <div>
                        <p class="text-sm text-gray-500">Your Rank</p>
                        <p class="text-lg font-bold">#${userIndex + 1}</p>
                        <p class="text-sm text-gray-400">${capitalizeFirstChar(currentUser.fname)} ${capitalizeFirstChar(currentUser.lname)}</p>
                    </div>

                    <div class="text-right">
                        <p class="text-sm text-gray-500">Your Score</p>
                        <p class="text-lg font-bold text-blue-600">${percentage}%</p>
                        <p class="text-xs text-gray-500">${user.grade}/10</p>
                    </div>
                </div>
            `;
        } else {
            userRankSection.innerHTML = `
                <div class="bg-white rounded-xl shadow-md p-4 text-center text-gray-400 border mt-4">
                    <p>You haven't completed the exam yet.</p>
                </div>
            `;
        }
    }

});

function capitalizeFirstChar(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
// handle sign out-------------------------------------------
var user = JSON.parse(sessionStorage.getItem('user'))

if (user == null)
    window.location.replace('LoginPage.html');


var signOutBtn = document.getElementById('sign-out');
signOutBtn.addEventListener('click', function () {
    sessionStorage.removeItem('user');

    window.location.replace('LoginPage.html');
});



// document.addEventListener("DOMContentLoaded", function () {


//     if (!localStorage.getItem("leaderboard")) {

        // var dummyData = [
        //     { fname: "amr", lname: "galal", email: "amr@mail.com", password: "12345678", grade: 7 },
        //     { fname: "sara", lname: "mohamed", email: "sara@mail.com", password: "12345678", grade: 3 },
        //     { fname: "ahmed", lname: "ali", email: "ahmed@mail.com", password: "12345678", grade: 9 },
        //     { fname: "nour", lname: "hassan", email: "nour@mail.com", password: "12345678", grade: 5 },
        //     { fname: "youssef", lname: "ibrahim", email: "youssef@mail.com", password: "12345678", grade: 1 },
        //     { fname: "mariam", lname: "khaled", email: "mariam@mail.com", password: "12345678", grade: 10 },
        //     { fname: "omar", lname: "adel", email: "omar@mail.com", password: "12345678", grade: 4 },
        //     { fname: "hana", lname: "mostafa", email: "hana@mail.com", password: "12345678", grade: 8 },
        //     { fname: "karim", lname: "samir", email: "karim@mail.com", password: "12345678", grade: 2 },
        //     { fname: "salma", lname: "wael", email: "salma@mail.com", password: "12345678", grade: 6 }
        // ];

//         localStorage.setItem("leaderboard", JSON.stringify());
//     }


//     let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

//     leaderboard = leaderboard.filter(user => user.grade > -1);


//     leaderboard.sort((a, b) => {

//         if (b.grade !== a.grade) {
//             return b.grade - a.grade;
//         }

//         var nameA = (a.fname + " " + a.lname).toLowerCase();
//         var nameB = (b.fname + " " + b.lname).toLowerCase();

//         return nameA.localeCompare(nameB);
//     });

//     var leaderboardList = document.getElementById("leaderboardList");
    

//     leaderboard.slice(0, 10).forEach((user, index) => {

//         var percentage = user.grade * 10;
//         var fullName = user.fname + " " + user.lname;

//         var div = document.createElement("div");

//         div.className = `
//             flex justify-between items-center
//             p-4 rounded-xl
//             bg-gray-100 border border-gray-200
//         `;

//         div.innerHTML = `
//             <div>
//                 <p class="font-bold">
//                     #${index + 1} - ${fullName}
//                 </p>
//                 <p class="text-sm text-gray-500">
//                     ${new Date().toLocaleDateString()}
//                 </p>
//             </div>

//             <div class="text-right">
//                 <p class="text-xl font-bold text-blue-600">
//                     ${percentage}%
//                 </p>
//                 <p class="text-sm text-gray-500">
//                     ${percentage}/100
//                 </p>
//             </div>
//         `;

//         leaderboardList.appendChild(div);
//     });


//     if (!localStorage.getItem("currentUser")) {
//         localStorage.setItem("currentUser", JSON.stringify({
//             email: "amr@mail.com"
//         }));
//     }

//     var currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     if (currentUser) {

//         var userIndex = leaderboard.findIndex(
//             user => user.email === currentUser.email
//         );

//         if (userIndex !== -1) {

//             var user = leaderboard[userIndex];
//             var percentage = user.grade * 10;

//             var userRankSection = document.getElementById("userRankSection");

//             userRankSection.innerHTML = `
//                 <div class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border">
                    
//                     <div>
//                         <p class="text-sm text-gray-500">Your Rank</p>
//                         <p class="text-lg font-bold">
//                             #${userIndex + 1}
//                         </p>
//                     </div>

//                     <div class="text-right">
//                         <p class="text-sm text-gray-500">Your Score</p>
//                         <p class="text-lg font-bold text-blue-600">
//                             ${percentage}%
//                         </p>
//                         <p class="text-xs text-gray-500">
//                             ${percentage}/100
//                         </p>
//                     </div>

//                 </div>
//             `;
//         }
//     }

// });