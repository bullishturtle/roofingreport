import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - TheRoofFax.com",
  description: "The terms and conditions for using TheRoofFax.com services.",
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to TheRoofFax.com. By accessing or using our website and services, you agree to be bound by these
              Terms of Service.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using TheRoofFax.com, you agree to be bound by these Terms of Service and all applicable
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
              accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on TheRoofFax.com for personal, non-commercial
              use only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on TheRoofFax.com</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on TheRoofFax.com are provided on an 'as is' basis. TheRoofFax.com makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall TheRoofFax.com or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on TheRoofFax.com, even if TheRoofFax.com or a TheRoofFax.com authorized
              representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on TheRoofFax.com could include technical, typographical, or photographic errors.
              TheRoofFax.com does not warrant that any of the materials on its website are accurate, complete or
              current. TheRoofFax.com may make changes to the materials contained on its website at any time without
              notice.
            </p>

            <h2>6. Links</h2>
            <p>
              TheRoofFax.com has not reviewed all of the sites linked to its website and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by TheRoofFax.com
              of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2>7. Modifications</h2>
            <p>
              TheRoofFax.com may revise these terms of service for its website at any time without notice. By using this
              website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
