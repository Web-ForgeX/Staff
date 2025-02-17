import { Camera } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import URLS from "@/Config/URLS";
import { User } from "@supabase/supabase-js";
import SendRequest from "@/API/request";

export default function USER_SETTINGS_Account_Info({ user }: { user: User }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [username, setUsername] = useState(user?.user_metadata?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    `${URLS.USER_AVATARS_BUCKET}/${user?.user_metadata?.picture}`,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setError(null);
    setIsSaving(true);
    try {
      if (username !== user?.user_metadata?.username) {
        await SendRequest({
          method: "POST",
          route: "/user/account/update/username",
          body: { username },
        });
      }

      if (email !== user?.email) {
        await SendRequest({
          method: "POST",
          route: "/user/account/update/email",
          body: { email },
        });
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await SendRequest({
          method: "POST",
          route: "/user/account/update/picture",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user info:", error);
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
        Profile Information
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <label className="cursor-pointer block relative">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <img
              src={previewImage}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
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
