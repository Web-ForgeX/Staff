export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary absolute bottom w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/discord"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/tos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © 2025 ForgeX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
