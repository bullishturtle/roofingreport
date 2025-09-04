"use client"
import { useState } from "react"

const Page = () => {
  const [proName, setProName] = useState("")

  const handleCheckPro = () => {
    // Placeholder for checking pro logic
    console.log(`Checking pro: ${proName}`)
  }

  return (
    <div>
      <section className="hero">
        <h1>Check any pro instantly</h1>
        <p>Ensure you're working with a verified professional.</p>
      </section>

      <section className="verification-results">
        {proName ? (
          <div>
            <h2>This pro is verified</h2>
            <p>{proName} appears legitimate.</p>
          </div>
        ) : (
          <div>
            <h2>This pro has issues</h2>
            <p>pro may not be legitimate.</p>
          </div>
        )}
      </section>

      <section className="warning-messages">
        <h2>Warning</h2>
        <p>Don't let unverified pros work on your project.</p>
      </section>

      <section className="form">
        <label htmlFor="pro-name">Pro/Contractor Name</label>
        <input
          type="text"
          id="pro-name"
          placeholder="Enter pro or company name"
          value={proName}
          onChange={(e) => setProName(e.target.value)}
        />
        <button onClick={handleCheckPro}>Check Pro</button>
      </section>

      <section className="cta">
        <h2>Every pro should be verified</h2>
        <p>Protect your project with our verification service.</p>
      </section>
    </div>
  )
}

export default Page
