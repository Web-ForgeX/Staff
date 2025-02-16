import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserLogin } from "@/API/auth/types";
import { UserSignUp, UserSignIn } from "@/API/auth/functions";

interface LoginFormProps extends React.ComponentProps<"div"> {
  type?: "signin" | "signup";
}

export function LoginForm({
  className,
  type = "signin",
  ...props
}: LoginFormProps) {
  const isSignIn = type === "signin";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = isSignIn
        ? await UserSignIn(formData)
        : await UserSignUp(formData);

      if ("message" in result) {
        setError(result.message);
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isSignIn ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {isSignIn
                    ? "Login to your ForgeX account"
                    : "Sign up for a new ForgeX account"}
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!isSignIn && (
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="yourusername"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="●●●●●●●●●●●"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
              </Button>
              <div className="text-center text-sm">
                {isSignIn ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <a
                      href="/auth/signup"
                      className="text-primary hover:text-primary/90"
                    >
                      Sign up
                    </a>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <a
                      href="/auth/signin"
                      className="text-primary hover:text-primary/90"
                    >
                      Sign in
                    </a>
                  </>
                )}
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://assets.forgex.net/SVG/bg.svg"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="/tos" className="text-primary hover:text-primary/90">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-primary hover:text-primary/90">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}

export default LoginForm;
