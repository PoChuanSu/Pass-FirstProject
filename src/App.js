import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./superbase";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function getFacts() {
            setIsLoading(true);

            let { data: facts, error } = await supabase
                .from("facts")
                .select("*")
                .order("votesInteresting", { ascending: false })
                .limit(1000);

            if (!error) setFacts(facts);
            else alert("There was a problem getting data");
            setIsLoading(false);
        }

        getFacts();
    }, []);

    return (
        <>
            <Headers showForm={showForm} setShowForm={setShowForm} />
            {showForm ? (
                <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
            ) : null}
            <main className="main">
                <CategoryFilter />
                {isLoading ? <Loader /> : <FactList facts={facts} />}
            </main>
        </>
    );
}

function Loader() {
    return <p className="message">Loading ...</p>;
}

function Headers({ showForm, setShowForm }) {
    const appTitle = "Today I Learned";
    return (
        <header className="header">
            <div className="logo">
                <img src="logo.png" alt="Today I learned Logo" />
                <h1>{appTitle}</h1>
            </div>
            <button
                className="btn btn-large btn-open"
                onClick={() => setShowForm((show) => !show)}
            >
                {showForm ? "Close form" : "Share a fact"}
            </button>
        </header>
    );
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
    const [text, setText] = useState("");
    const [source, setSource] = useState("http://example.com");
    const [category, setCategory] = useState("");

    const textLength = text.length;

    function handleSubmit(e) {
        e.preventDefault();
        console.log(text, source, category);

        if (text && isValidHttpUrl(source) && category && textLength <= 200) {
            const newFact = {
                id: Math.round(Math.random() * 1000),
                text,
                source,
                category,
                votesInteresting: 0,
                votesMindblowing: 0,
                votesFalse: 0,
                createdIn: new Date().getFullYear(),
            };

            setFacts((facts) => [newFact, ...facts]);

            setText("");
            setSource("");
            setCategory("");

            setShowForm(false);
        }
    }

    return (
        <form className="fact-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Share a fact with the world..."
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <span>{200 - textLength} characters left</span>
            <input
                type="text"
                placeholder="Trustworthy source..."
                value={source}
                onChange={(e) => {
                    setSource(e.target.value);
                }}
            />
            <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            >
                <option value="">Choose Category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                        {cat.name.toUpperCase()}
                    </option>
                ))}
            </select>
            <button className="btn btn-large">Post</button>
        </form>
    );
}

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

function CategoryFilter() {
    return (
        <aside>
            <ul>
                <li className="category">
                    <button className="btn btn-all-category">All</button>
                </li>
                {CATEGORIES.map((cat) => (
                    <li key={cat.name} className="category">
                        <button
                            className="btn btn-category"
                            style={{ backgroundColor: cat.color }}
                        >
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

function FactList({ facts }) {
    // const facts = initialFacts;

    return (
        <section>
            <ul className="facts-list">
                {facts.map((fact) => (
                    <Fact key={fact.id} fact={fact} />
                ))}
            </ul>
        </section>
    );
}

function Fact({ fact }) {
    return (
        <li className="fact">
            <p>
                {fact.text}
                <a
                    className="source"
                    href={fact.source}
                    target="_blank"
                    rel="noreferrer"
                >
                    (Source)
                </a>
                <span
                    className="tag"
                    style={{
                        backgroundColor: CATEGORIES.find(
                            (cat) => cat.name === fact.category
                        ).color,
                    }}
                >
                    {fact.category}
                </span>
            </p>
            <div className="vote-buttons">
                <button>👍 {fact.votesInteresting}</button>
                <button>🤯 {fact.votesMindblowing}</button>
                <button>⛔️ {fact.votesFalse}</button>
            </div>
        </li>
    );
}

export default App;
