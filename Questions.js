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


questions.sort(() => Math.random() - 0.5);
for (let i = 0; i < questions.length; i++) {
  questions[i].choices.sort(() => Math.random() - 0.5);
}
console.log(questions);

