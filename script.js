const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share a fact";
    }
});

// variable demo

// let votesInteresting = 123;
// let votesMindblowing = 123;

// const text = "Lisbon is the capital of Portugal";

// console.log("Total Votes: ", votesInteresting + votesMindblowing);

// const isCorrect = votesInteresting === votesMindblowing;
// console.log(isCorrect);

// function demo

// function calcFactAge(year) {
//     const d = new Date();
//     const currentYear = d.getFullYear();
//     const age = currentYear - year;

//     if (age >= 0) return age;
//     else return "Impossible year";
// }

// const age1 = calcFactAge(2025);
// console.log(age1);

// const age2 = calcFactAge(2000);
// console.log(age2);

// if / else statement

// let votesInteresting = 135;
// let votesMindblowing = 125;

// if (votesInteresting === votesMindblowing) {
//     const message = "Interesting votes are equal to Mindblowing votes";
// } else {
//     const message = "votesInteresting is not equal to votesMindblowing";
// }

// falsy value: 0, '', null, undefined
// truthy: others

// Ternary
// let votesInteresting = 115;
// let votesMindblowing = 125;

// const message =
//     votesInteresting > votesMindblowing
//         ? "votesInteresting is greater than votesMindblowing"
//         : "votesInteresting is smaller than votesMindblowing";

// console.log(message);

// Back tick Demo
// const text = "Lisbon is the capital of Portugal";
// let votesInteresting = 115;
// let votesMindblowing = 125;
// const d = new Date();
// const currentYear = d.getFullYear();

// function calcFactAge(year) {
//     const age = currentYear - year;
//     if (age >= 0) return age;
//     else return "Impossible year";
// }

// const str = `This text is ${text}. It is ${calcFactAge(2020)} years old. It ${
//     votesInteresting > votesMindblowing
//         ? "votesInteresting is greater than votesMindblowing"
//         : "votesInteresting is smaller than votesMindblowing"
// }`;

// console.log(str);

// arrow function
// const calcFactAgeArrow = (year) =>
//     currentYear - year >= 0 ? currentYear - year : "Impossible year";

// console.log(calcFactAgeArrow(2025));

// array
// const fact = ["Lisbon is the capital of Portugal", 1234, false];

// const [text1, number, isFalse] = fact;

// console.log(fact);

// let popElement = fact.shift();
// console.log(fact);

// fact.unshift("Lisbon is the capital of Portugal");
// console.log(fact);
