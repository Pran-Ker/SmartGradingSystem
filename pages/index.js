import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput, answer: answerInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQuestionInput("");
      setAnswerInput("");
    } catch (error) {
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
        <h3>Exam Grading System</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter the Question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <textarea
            type="text"
            name="answer"
            placeholder="Enter the Answer"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            rows={Math.max(Math.ceil(answerInput.length / 50), 3)}
          />
          <input type="submit" value="Generate the score" />
        </form>

        <h3>OR</h3>
        <form action="/" method="POST" enctype="multipart/form-data">
        <label for="image" class="file-upload">Upload Exam Sheet:</label>
          <input type="file" id="image" name="image"></input>
          <input type="submit" value="Generate the score" />
        </form>

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
