interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  console.log("Sending email:", { to, subject })
  // In a real app, this would send an actual email
}

export default sendEmail
