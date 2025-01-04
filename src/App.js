import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./superbase";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("all");

    useEffect(
        function () {
            async function getFacts() {
                setIsLoading(true);

                let query = supabase.from("facts").select("*");

                if (currentCategory !== "all")
                    query = query.eq("category", currentCategory);

                let { data: facts, error } = await query
                    .order("votesInteresting", { ascending: false })
                    .limit(1000);

                if (!error) setFacts(facts);
                else alert("There was a problem getting data");
                setIsLoading(false);
            }

            getFacts();
        },
        [currentCategory]
    );

    return (
        <>
            <Headers showForm={showForm} setShowForm={setShowForm} />
            {showForm ? (
                <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
            ) : null}
            <main className="main">
                <CategoryFilter setCurrentCategory={setCurrentCategory} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <FactList facts={facts} setFacts={setFacts} />
                )}
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
    const [isUploading, setIsUploading] = useState(false);

    const textLength = text.length;

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(text, source, category);

        if (text && isValidHttpUrl(source) && category && textLength <= 200) {
            setIsUploading(true);
            const { data: newFact, error } = await supabase
                .from("facts")
                .insert([{ text, source, category }])
                .select();

            if (!error) {
                setIsUploading(false);

                setFacts((facts) => [newFact[0], ...facts]);

                setText("");
                setSource("");
                setCategory("");
                setShowForm(false);
            } else {
                alert("There was a problem for uploading data");
            }
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
                disabled={isUploading}
            />
            <span>{200 - textLength} characters left</span>
            <input
                type="text"
                placeholder="Trustworthy source..."
                value={source}
                onChange={(e) => {
                    setSource(e.target.value);
                }}
                disabled={isUploading}
            />
            <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
                disabled={isUploading}
            >
                <option value="">Choose Category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                        {cat.name.toUpperCase()}
                    </option>
                ))}
            </select>
            <button className="btn btn-large" disabled={isUploading}>
                Post
            </button>
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

function CategoryFilter({ setCurrentCategory }) {
    return (
        <aside>
            <ul>
                <li className="category">
                    <button
                        className="btn btn-all-category"
                        onClick={() => setCurrentCategory("all")}
                    >
                        All
                    </button>
                </li>
                {CATEGORIES.map((cat) => (
                    <li key={cat.name} className="category">
                        <button
                            className="btn btn-category"
                            style={{ backgroundColor: cat.color }}
                            onClick={() => setCurrentCategory(cat.name)}
                        >
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

function FactList({ facts, setFacts }) {
    // const facts = initialFacts;

    return (
        <section>
            <ul className="facts-list">
                {facts.map((fact) => (
                    <Fact key={fact.id} fact={fact} setFacts={setFacts} />
                ))}
            </ul>
        </section>
    );
}

function Fact({ fact, setFacts }) {
    const [isUpdating, setIsUpdating] = useState(false);

    const isDisputed =
        fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

    async function handleVote(columnName) {
        setIsUpdating(true);
        const { data: updatedFact, error } = await supabase
            .from("facts")
            .update([{ [columnName]: fact[columnName] + 1 }])
            .eq("id", fact.id)
            .select();

        if (!error) {
            setFacts((facts) =>
                facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
            );
            setIsUpdating(false);
        }
    }

    return (
        <li className="fact">
            <p>
                {isDisputed ? (
                    <span className="disputed">[DISPUTED]</span>
                ) : null}
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
                <button
                    onClick={() => handleVote("votesInteresting")}
                    disabled={isUpdating}
                >
                    👍 {fact.votesInteresting}
                </button>
                <button
                    onClick={() => handleVote("votesMindblowing")}
                    disabled={isUpdating}
                >
                    🤯 {fact.votesMindblowing}
                </button>
                <button
                    onClick={() => handleVote("votesFalse")}
                    disabled={isUpdating}
                >
                    ⛔️ {fact.votesFalse}
                </button>
            </div>
        </li>
    );
}

export default App;
