import { Camera } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import URLS from "@/Config/URLS";
import { User } from "@supabase/supabase-js";
export default function USER_SETTINGS_Account_Info({ user }: { user: User }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 border-border p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">
        Profile Information
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <label className="cursor-pointer block relative">
            <Input type="file" accept="image/*" className="hidden" />
            <img
              src={`${URLS.USER_AVATARS_BUCKET}/${user?.user_metadata?.avatar}`}
              alt={`${user?.user_metadata?.username}`}
              className="w-20 h-20 rounded-full object-cover border-border border-2"
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white text-sm border-2 border-primary">
                <Camera className="w-4 h-4 mr-1" />
                Change
              </div>
            )}
          </label>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={user?.user_metadata?.username}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                value={user?.email}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
