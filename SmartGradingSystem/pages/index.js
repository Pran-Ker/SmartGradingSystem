import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [thoughtInput, setthoughtInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thought: thoughtInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setthoughtInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Teserract</title>
        <link rel="icon" href="/warp.png" />
      </Head>

      <main className={styles.main}>
        <img src="/warp.png" className={styles.icon} />
        <h3>Input possible future</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="thought"
            placeholder="Enter an thought"
            value={thoughtInput}
            onChange={(e) => setthoughtInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
