import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setquestionInput] = useState("");
  const [answerInput, setanswerInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput },{answer: answerInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setquestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>EGS</title>
        <link rel="icon" href="/warp.png" />
      </Head>

      <main className={styles.main}>
        <img src="/warp.png" className={styles.icon} />
        <h3>Exam grading system</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter the Question"
            value={questionInput}
            onChange={(e) => setquestionInput(e.target.value)}
          />
          <input
            type="text"
            name="answer"
            placeholder="Enter the Answer"
            value={answerInput}
            onChange={(e) => setanswerInput(e.target.value)}
          />
          <input type="submit" value="Generate the score" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
