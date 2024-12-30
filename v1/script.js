const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];

console.log(CATEGORIES.find((cat) => cat.name === "history").color);

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share a fact";
    }
});

factsList.innerHTML = "";

function createFactsList(dataArray) {
    const htmlArr = dataArray.map(
        (fact) => `<li class="fact">
                    <p>${fact.text}
                        <a
                            class="source"
                            href="${fact.source}"
                            target="_blank"
                            >(Source)
                        </a>
                        <span
                            class="tag"
                            style="background-color:${
                                CATEGORIES.find(
                                    (cat) => cat.name === fact.category
                                ).color
                            }"
                            >${fact.category}
                        </span>
                    </p>
                        <div class="vote-buttons">
                            <button>👍 ${fact.votesInteresting}</button>
                            <button>🤯 ${fact.votesMindblowing}</button>
                            <button>⛔️ ${fact.votesFalse}</button>
                        </div>
                </li>`
    );

    const html = htmlArr.join("");
    factsList.insertAdjacentHTML("afterbegin", html);
}

// createFactsList(initialFacts);

// Load data from Supabase
const res = fetch("https://ewezkutukgvygxgamskx.supabase.co/rest/v1/facts", {
    headers: {
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXprdXR1a2d2eWd4Z2Ftc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzU2MDIsImV4cCI6MjA1MDg1MTYwMn0.eHPs3dcw-6IP__DeVuGjZaaSlGvtJEfx5CWXkYNBMrE",
        authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXprdXR1a2d2eWd4Z2Ftc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzU2MDIsImV4cCI6MjA1MDg1MTYwMn0.eHPs3dcw-6IP__DeVuGjZaaSlGvtJEfx5CWXkYNBMrE",
    },
});

async function loadFacts() {
    const res = await fetch(
        "https://ewezkutukgvygxgamskx.supabase.co/rest/v1/facts",
        {
            headers: {
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXprdXR1a2d2eWd4Z2Ftc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzU2MDIsImV4cCI6MjA1MDg1MTYwMn0.eHPs3dcw-6IP__DeVuGjZaaSlGvtJEfx5CWXkYNBMrE",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXprdXR1a2d2eWd4Z2Ftc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzU2MDIsImV4cCI6MjA1MDg1MTYwMn0.eHPs3dcw-6IP__DeVuGjZaaSlGvtJEfx5CWXkYNBMrE",
            },
        }
    );

    const data = await res.json();
    createFactsList(data);
}

loadFacts();

// console.log(htmlArr);
// const html = htmlArr.join("");
// factsList.insertAdjacentHTML("afterbegin", html);

// console.log(arr.filter((element) => element > 10));

// // Find the first element greater than 10
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > 10) {
//         console.log(arr[i]);
//         break;
//     }
// }

// console.log(arr.find((element) => element > 10));

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

// object
// const factObj = {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//     createSummary: function () {
//         return `The fact ${this.text} is from the category ${this.category}`;
//     },
// };
// console.log(factObj.createSummary());

// const { source, category } = factObj;
// console.log(source);
// console.log(category);
