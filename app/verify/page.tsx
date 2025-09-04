"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "./page.module.css"

const VerifyPage = () => {
  const [name, setName] = useState("")
  const [results, setResults] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Simulate verification process
    if (name === "LegitimatePro") {
      setResults("This pro is verified")
    } else {
      setResults("This pro appears to have issues")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Verify Any Pro Instantly</title>
        <meta
          name="description"
          content="Before you let any pro or contractor work on your project, verify them instantly."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Verify Any Pro Instantly</h1>

        <p className={styles.description}>
          Before you let any pro or contractor work on your project, verify them instantly.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Pro/Contractor Information</h2>
          <input
            type="text"
            placeholder="Company or pro name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Verify
          </button>
        </form>

        {results && <div className={styles.results}>{results}</div>}

        {results === "This pro appears to have issues" && (
          <div className={styles.warning}>Warning: This pro may not be legitimate.</div>
        )}
      </main>
    </div>
  )
}

export default VerifyPage
