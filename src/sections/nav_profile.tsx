import { Mail, Folder, Store, Settings } from "lucide-react";
import VerifiedBadge from "@/components/ui/verified";
import { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import URLS from "@/Config/URLS";

// Hooks
import { useInbox } from "@/hooks/inbox";

export default function SECTION_Nav_Profile({ user }: { user: User }) {
  const { toggleInboxPopup } = useInbox();

  const navigateTo = (path: string) => () => {
    window.location.href = path;
  };

  return (
    <div className="flex items-center space-x-3 bg-secondary px-3 h-12 py-1 rounded-lg">
      <div className="flex items-center space-x-2">
        <img
          src={`${URLS.USER_AVATARS_BUCKET}/${user?.user_metadata?.picture}`}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">
            {user?.user_metadata?.username}
          </span>
          {user?.user_metadata?.verified && <VerifiedBadge className="w-3" />}
        </div>
      </div>
      <div className="border-r border-black/10 mx-2 h-6" />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleInboxPopup}
        className="relative"
      >
        <Mail className="w-5 h-5" />
        {user?.user_metadata?.inbox_unread > 0 && (
          <span className="absolute top-1 right-0 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {user?.user_metadata?.inbox_unread}
          </span>
        )}
      </Button>
      <Button
        variant="ghost"
        onClick={navigateTo("/user/content")}
        size="icon"
        className="p-1"
      >
        <Folder className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={navigateTo("/user/stores")}
        className="p-1"
      >
        <Store className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        onClick={navigateTo("/user/settings")}
        size="icon"
        className="p-1"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}
