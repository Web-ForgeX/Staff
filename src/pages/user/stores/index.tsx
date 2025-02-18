import SECTION_Users_Stores from "@/sections/users_stores";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useAuth } from "@/hooks/user";
export default function User_Stores() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-10 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
          Your Stores
        </h1>

        <Button onClick={() => (window.location.href = "/stores/create")}>
          <CirclePlus className="h-4" /> Create New Store
        </Button>
      </div>
      <SECTION_Users_Stores
        controls={true}
        username={user?.user_metadata.username}
      />
    </div>
  );
}
