"use client"
import { useRouter } from "next/router"

const SuccessPage = () => {
  const router = useRouter()

  const handleNextStep = () => {
    router.push("/dashboard")
  }

  return (
    <div>
      <h1>Thank You for Your Registration!</h1>
      <p>We connect homeowners with licensed pros.</p>
      <p>Now, you can activate your full protection and pro verification tools.</p>
      <button onClick={handleNextStep}>Go to Dashboard</button>
    </div>
  )
}

export default SuccessPage
