
document.addEventListener("DOMContentLoaded", function () {


    if (!localStorage.getItem("leaderboard")) {

        // const dummyData = [
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

        localStorage.setItem("leaderboard", JSON.stringify());
    }


    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard = leaderboard.filter(user => user.grade > -1);


    leaderboard.sort((a, b) => {

        if (b.grade !== a.grade) {
            return b.grade - a.grade;
        }

        const nameA = (a.fname + " " + a.lname).toLowerCase();
        const nameB = (b.fname + " " + b.lname).toLowerCase();

        return nameA.localeCompare(nameB);
    });

    const leaderboardList = document.getElementById("leaderboardList");
    

    leaderboard.slice(0, 10).forEach((user, index) => {

        const percentage = user.grade * 10;
        const fullName = user.fname + " " + user.lname;

        const div = document.createElement("div");

        div.className = `
            flex justify-between items-center
            p-4 rounded-xl
            bg-gray-100 border border-gray-200
        `;

        div.innerHTML = `
            <div>
                <p class="font-bold">
                    #${index + 1} - ${fullName}
                </p>
                <p class="text-sm text-gray-500">
                    ${new Date().toLocaleDateString()}
                </p>
            </div>

            <div class="text-right">
                <p class="text-xl font-bold text-blue-600">
                    ${percentage}%
                </p>
                <p class="text-sm text-gray-500">
                    ${percentage}/100
                </p>
            </div>
        `;

        leaderboardList.appendChild(div);
    });


    if (!localStorage.getItem("currentUser")) {
        localStorage.setItem("currentUser", JSON.stringify({
            email: "amr@mail.com"
        }));
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

        const userIndex = leaderboard.findIndex(
            user => user.email === currentUser.email
        );

        if (userIndex !== -1) {

            const user = leaderboard[userIndex];
            const percentage = user.grade * 10;

            const userRankSection = document.getElementById("userRankSection");

            userRankSection.innerHTML = `
                <div class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border">
                    
                    <div>
                        <p class="text-sm text-gray-500">Your Rank</p>
                        <p class="text-lg font-bold">
                            #${userIndex + 1}
                        </p>
                    </div>

                    <div class="text-right">
                        <p class="text-sm text-gray-500">Your Score</p>
                        <p class="text-lg font-bold text-blue-600">
                            ${percentage}%
                        </p>
                        <p class="text-xs text-gray-500">
                            ${percentage}/100
                        </p>
                    </div>

                </div>
            `;
        }
    }

});