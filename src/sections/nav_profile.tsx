import { Mail, Folder, Store, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import URLS from "@/Config/URLS";

// Hooks
import { useInbox } from "@/hooks/inbox";
export default function SECTION_Nav_Profile() {
  const unreadCount = 3;
  const { toggleInboxPopup } = useInbox();

  return (
    <div className="flex items-center space-x-3 bg-secondary px-3 h-12 py-1 rounded-lg">
      <div className="flex items-center space-x-2">
        <img
          src={`${URLS.USER_AVATARS_BUCKET}/a253cd8a-3445-4641-b911-137125dc8e38.jpg`}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm font-medium">Char</span>
      </div>
      <div className="border-r border-black/10 mx-2 h-6" />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleInboxPopup}
        className="relative"
      >
        <Mail className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-0 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
      <Button
        variant="ghost"
        onClick={() => (window.location.href = `/user/content`)}
        size="icon"
        className="p-1"
      >
        <Folder className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => (window.location.href = `/user/stores`)}
        className="p-1"
      >
        <Store className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => (window.location.href = `/user/settings`)}
        size="icon"
        className="p-1"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}
