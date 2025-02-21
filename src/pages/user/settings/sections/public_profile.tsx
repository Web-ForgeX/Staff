import { Camera } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SendRequest from "@/API/request";
import { User } from "@supabase/supabase-js";

export default function USER_SETTINGS_Public_Profile({ user }: { user: User }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [bio, setBio] = useState(user?.user_metadata?.bio || "");
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string>(
    `https://nijvzcdijjnlnkjbulkf.supabase.co/storage/v1/object/public/stores/banners/default.jpg`,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedBanner(file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setError(null);
    setIsSaving(true);
    try {
      if (bio !== user?.user_metadata?.bio) {
        await SendRequest({
          method: "POST",
          route: "/user/account/update/bio",
          body: { bio },
        });
      }

      if (selectedBanner) {
        const formData = new FormData();
        formData.append("file", selectedBanner);

        await SendRequest({
          method: "POST",
          route: "/user/account/update/banner",
          body: formData,
        });
      }
    } catch (error) {
      console.error("Failed to update public profile:", error);
      setError(
        "An error occurred while updating your profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 border-border p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">
        Public Profile
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <div className="flex flex-col gap-6 text-center sm:text-left">
        <div
          className="relative w-full h-[200px] overflow-hidden rounded-lg border-2 border-border"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <label className="cursor-pointer block relative w-full h-full">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
            <img
              src={previewBanner}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm border-2 border-primary">
                <Camera className="w-4 h-4 mr-1" /> Change Banner
              </div>
            )}
          </label>
        </div>

        <div className="md:mt-20">
          <label className="text-sm font-medium text-muted-foreground">
            Bio
          </label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
