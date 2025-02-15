import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, HelpCircle } from "lucide-react";

export default function Not_Found() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md px-4 text-center">
        <div className="mb-8">
          <div className="text-9xl font-black text-primary">404</div>
          <h1 className="text-3xl font-bold mt-4">Page not found</h1>
          <p className="text-muted-foreground mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <Link to="/browse">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/discord">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
