import { Link } from "react-router-dom";

export default function TOSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 15, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">1.</span> Introduction
              </h2>
              <p className="text-muted-foreground">
                Welcome to ForgeX. These Terms of Service constitute a legally
                binding agreement between you and ForgeX regarding the use of
                our services, website, and tools. By accessing or using our
                services, you agree to comply with these terms. If you do not
                agree, you must discontinue use immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">2.</span> User Eligibility &
                Accounts
              </h2>
              <p className="text-muted-foreground">
                Our services are available to users aged 13 and older. If you
                are a minor, you must have permission from a parent or guardian.
                You agree to provide accurate information when creating an
                account and to safeguard your credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">3.</span> Acceptable Use
              </h2>
              <p className="text-muted-foreground">
                Users must not engage in activities that violate laws, infringe
                on intellectual property, or harm our platform’s integrity.
                Automated access (e.g., scraping or crawling) outside of our
                provided API is prohibited without authorization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">4.</span> Content & Licensing
              </h2>
              <p className="text-muted-foreground">
                By submitting content to ForgeX, you grant us a non-exclusive,
                worldwide license to use, distribute, and display that content.
                You warrant that all content you provide is original or properly
                licensed and does not violate any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">5.</span> Purchases & Refunds
              </h2>
              <p className="text-muted-foreground">
                All sales are final. We do not provide refunds except where
                required by law. Prices and availability of services may change
                without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">6.</span> Termination &
                Restrictions
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate accounts at our
                discretion, with or without notice, for violations of these
                Terms. Users may appeal decisions through our support channels,
                but our determination is final.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">7.</span> Contact Information
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
