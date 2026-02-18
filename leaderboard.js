
document.addEventListener("DOMContentLoaded", function () {

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    
    leaderboard.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById("leaderboardList");

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = `
            <p class="text-center text-gray-500 text-lg">
                No results yet.
            </p>
        `;
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    leaderboard.slice(0, 10).forEach((user, index) => {

        const isCurrentUser = currentUser && user.email === currentUser.email;

        const div = document.createElement("div");

        div.className = `
            flex justify-between items-center p-5 rounded-2xl border
            ${isCurrentUser 
                ? "bg-purple-100 border-purple-400" 
                : "bg-gray-50"}
        `;

        div.innerHTML = `
            <div>
                <p class="text-xl font-bold">
                    #${index + 1} - ${user.name}
                    ${isCurrentUser ? "<span class='text-sm text-blue-600'>(You)</span>" : ""}
                </p>
                <p class="text-gray-600 text-sm">
                    ${user.correct} / ${user.total} correct
                </p>
            </div>

            <div class="text-3xl font-bold text-blue-600">
                ${user.score}%
            </div>
        `;

        leaderboardList.appendChild(div);
    });

});
