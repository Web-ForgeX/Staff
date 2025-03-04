import { Button } from "@/components/ui/button";

export default function SECTION_Auth_Buttons() {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="secondary"
        className="px-10"
        onClick={() => (window.location.href = "/auth/signin")}
      >
        Sign In
      </Button>
    </div>
  );
}
