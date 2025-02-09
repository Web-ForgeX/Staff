import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
export default function USER_SETTINGS_Session_Controls() {
  return (
    <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 border-border p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
        Session
      </h2>
      <p className="text-muted-foreground mb-6 text-center sm:text-left">
        Manage your active session and sign out from your account.
      </p>

      <div className="flex justify-center sm:justify-start">
        <Button variant="secondary" className="w-full sm:w-auto">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
