import VerifiedBadge from "@/components/ui/verified";
import { User } from "@supabase/supabase-js";
import supabase from "@/API/supabase";

import URLS from "@/Config/URLS";

export default function SECTION_Nav_Profile({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-3 bg-secondary px-3 h-12 py-1 rounded-lg">
      <div className="flex items-center space-x-2">
        <img
          src={`${URLS.USER_AVATARS_BUCKET}/${user?.user_metadata?.picture}`}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
        <div className="flex items-center space-x-1">
          <button
            className="text-sm font-medium"
            onClick={() => {
              supabase.auth.signOut().then(() => window.location.reload());
            }}
          >
            {user?.user_metadata?.username}
          </button>
          {user?.user_metadata?.verified && <VerifiedBadge className="w-3" />}
        </div>
      </div>
    </div>
  );
}
