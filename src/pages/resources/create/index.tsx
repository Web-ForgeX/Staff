import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Grid2X2,
  LayoutGrid,
  MessageSquare,
  Globe,
  Book,
  RefreshCw,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ImageSorting from "@/components/image-sorting";
import SupportOption from "@/components/support-option";
import DiscordIntegrationConfig from "@/components/discord-integration-config";
import ListInput from "@/components/list-input";
import FileUpload from "@/components/file-upload";
import SendRequest, { buildAuthHeaders } from "@/API/request";

interface UploadedFile {
  file: File;
  id: string;
}

export default function Resource_Create() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [displayType, setDisplayType] = useState<"grid" | "list">("grid");
  const [images, setImages] = useState<File[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [supportOptions, setSupportOptions] = useState({
    documentation: { enabled: false, value: "" },
    discord: { enabled: false, value: "" },
    website: { enabled: false, value: "" },
    updates: { enabled: false, value: "" },
  });

  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const [resourceName, setResourceName] = useState<string>("");
  const [resourceDescription, setResourceDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  function buildFormData() {
    const formData = new FormData();
    formData.set("name", resourceName);
    formData.set("description", resourceDescription);
    formData.set("layout", displayType);
    formData.set("price", String(price));
    formData.set(
      "discord_integration",
      JSON.stringify(
        discordEnabled
          ? {
              guild_id: selectedServer,
              role_id: selectedRole,
            }
          : null,
      ),
    );
    formData.set("features", JSON.stringify(features));
    formData.set("requirements", JSON.stringify(requirements));
    formData.set(
      "support_docs",
      supportOptions.documentation.enabled
        ? supportOptions.documentation.value
        : "",
    );
    formData.set(
      "support_discord_server",
      supportOptions.discord.enabled ? supportOptions.discord.value : "",
    );
    formData.set(
      "support_website",
      supportOptions.website.enabled ? supportOptions.website.value : "",
    );
    formData.set(
      "support_changelog",
      supportOptions.updates.enabled ? supportOptions.updates.value : "",
    );
    for (let i = 0; i < images.length; i++) {
      formData.set("image" + i + 1, images[i]);
    }
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.set("file" + i + 1, uploadedFiles[i].file);
    }

    return formData;
  }

  async function handleCreateResource() {
    const formData = buildFormData();
    try {
      setLoading(true);
      const d = await SendRequest({
        route: "resource/create",
        method: "POST",
        body: formData,
        headers: await buildAuthHeaders(),
      });
      if (d.error) {
        setLoading(false);
        setError(d.error);
      } else {
        setLoading(false);
        window.location.href = `/resources/${d.data.id}`;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Create New Resource</h1>
              <p className="text-muted-foreground mt-2">
                Create a new resource
              </p>
            </div>

            <div className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter resource name..."
                    className="mt-1.5"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe your resource..."
                    value={resourceDescription}
                    onChange={(e) => setResourceDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (USD)
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-7"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <ListInput
                label="Features"
                items={features}
                setItems={setFeatures}
              />

              {/* Requirements */}
              <ListInput
                label="Requirements"
                items={requirements}
                setItems={setRequirements}
              />

              {/* Support Options */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Support Options</label>
                <div className="space-y-4">
                  <SupportOption
                    icon={Book}
                    label="Documentation"
                    optionKey="documentation"
                    supportOptions={supportOptions}
                    setSupportOptions={setSupportOptions}
                  />
                  <SupportOption
                    icon={MessageSquare}
                    label="Discord Server"
                    optionKey="discord"
                    supportOptions={supportOptions}
                    setSupportOptions={setSupportOptions}
                  />
                  <SupportOption
                    icon={Globe}
                    label="Website"
                    optionKey="website"
                    supportOptions={supportOptions}
                    setSupportOptions={setSupportOptions}
                  />
                  <SupportOption
                    icon={RefreshCw}
                    label="Updates"
                    optionKey="updates"
                    supportOptions={supportOptions}
                    setSupportOptions={setSupportOptions}
                  />
                </div>
              </div>

              {/* Display Type Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Display Type</label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setDisplayType("grid")}
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer ${
                      displayType === "grid"
                        ? "ring-2 ring-primary scale-[1.02]"
                        : ""
                    }`}
                  >
                    <Grid2X2 className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">Grid Layout</span>
                  </button>
                  <button
                    onClick={() => setDisplayType("list")}
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer ${
                      displayType === "list"
                        ? "ring-2 ring-primary scale-[1.02]"
                        : ""
                    }`}
                  >
                    <LayoutGrid className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">List Layout</span>
                  </button>
                </div>
              </div>

              <ImageSorting images={images} setImages={setImages} />

              {/* Resource Content Upload */}
              <FileUpload
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />

              <div className="space-y-6">
                {/* Discord Integration */}
                <DiscordIntegrationConfig
                  discordEnabled={discordEnabled}
                  setDiscordEnabled={setDiscordEnabled}
                  selectedServer={selectedServer}
                  setSelectedServer={setSelectedServer}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    className="w-full"
                    onClick={handleCreateResource}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Resource"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
