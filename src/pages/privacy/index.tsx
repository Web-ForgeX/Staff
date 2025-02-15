import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 15, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">1.</span> Information We Collect
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We collect several types of information from and about users
                  of our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Personal information (name, email address, billing
                    information)
                  </li>
                  <li>Usage data (how you interact with our platform)</li>
                  <li>Device information (browser type, IP address)</li>
                  <li>Transaction data (purchase history, payment details)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">2.</span> How We Use Your
                Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Process your transactions</li>
                  <li>Send you important updates and notifications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">3.</span> Information Sharing
              </h2>
              <p className="text-muted-foreground">
                We do not sell your personal information to third parties. We
                may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Service providers who assist in operating our platform</li>
                <li>Law enforcement when required by law</li>
                <li>Other users when you choose to make your profile public</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">4.</span> Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">5.</span> Your Rights
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">6.</span> Cookies
              </h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track
                activity on our platform and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">7.</span> Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                Our platform is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">8.</span> Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">9.</span> Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms, contact us through{" "}
                <Link
                  to="/discord"
                  className="text-primary hover:text-primary/90"
                >
                  our Discord
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
