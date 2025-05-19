import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - TheRoofFax.com",
  description: "Learn how TheRoofFax.com handles and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              Your privacy is important to us. It is TheRoofFax.com's policy to respect your privacy regarding any
              information we may collect from you across our website, https://www.therooffax.com, and other sites we own
              and operate.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by
              fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and
              how it will be used.
            </p>

            <h3>1.1 Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property address</li>
              <li>Payment information</li>
            </ul>

            <h3>1.2 Log Data</h3>
            <p>
              When you visit our website, our servers may automatically log the standard data provided by your web
              browser. This data is considered non-identifying information, as it does not personally identify you on
              its own. It may include your computer's IP address, browser type and version, the pages you visit, the
              time and date of your visit, the time spent on each page, and other details.
            </p>

            <h2>2. Use of Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>
                Communicate with you, either directly or through one of our partners, including for customer service, to
                provide you with updates and other information relating to the website, and for marketing and
                promotional purposes
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2>3. Data Retention</h2>
            <p>
              We retain your personal information only for as long as is necessary for the purposes set out in this
              policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or
              other legal requirements).
            </p>

            <h2>4. Security</h2>
            <p>
              We value your trust in providing us your personal information, thus we are striving to use commercially
              acceptable means of protecting it. But remember that no method of transmission over the internet, or
              method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </p>

            <h2>5. Cookies</h2>
            <p>
              We use "cookies" to collect information about you and your activity across our site. A cookie is a small
              piece of data that our website stores on your computer, and accesses each time you visit, so we can
              understand how you use our site. This helps us serve you content based on preferences you have specified.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>We may employ third-party companies and individuals due to the following reasons:</p>
            <ul>
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personal identifiable
              information from children under 13. In the case we discover that a child under 13 has provided us with
              personal information, we immediately delete this from our servers. If you are a parent or guardian and you
              are aware that your child has provided us with personal information, please contact us so that we will be
              able to do necessary actions.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically
              for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These
              changes are effective immediately, after they are posted on this page.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at
              Landon@rooffax.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
