import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import SendRequest from "@/API/request";
import URLS from "@/Config/URLS";

interface UploadedFile {
  file: File;
  id: string;
}

export default function Resource_Create() {
  const { id } = useParams<{ id: string }>();
  const [displayType, setDisplayType] = useState<0 | 1>(0);
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

  // Fetch resource data on component mount
  useEffect(() => {
    async function fetchResourceData() {
      try {
        const response = await SendRequest({
          route: `/resource/id/${id}`,
          method: "GET",
        });

        if (response.error) {
          console.error("Failed to fetch resource:", response.error);
        } else {
          setResourceName(response.data.name);
          setResourceDescription(response.data.description);
          setPrice(response.data.price);
          setDisplayType(response.data.layout);
          setFeatures(response.data.features);
          setRequirements(response.data.requirements);

          const imgs = [];
          for (const imgUrl of response.data.image_urls) {
            const imageBlob = await fetch(
              `${URLS.RESOURCES_IMGS_BUCKET}/${imgUrl}`,
            )
              .then((res) => res.blob())
              .catch((err) => {
                console.error("Error fetching image:", err);
                return null;
              });

            if (imageBlob) {
              const file = new File([imageBlob], imgUrl, {
                type: imageBlob.type,
              });

              imgs.push(file);
            }
          }
          setImages(imgs);

          setSupportOptions({
            documentation: {
              enabled: response.data.support_docs !== "",
              value: response.data.support_docs,
            },
            discord: {
              enabled: response.data.support_discord_server !== "",
              value: response.data.support_discord_server,
            },
            website: {
              enabled: response.data.support_website !== "",
              value: response.data.support_website,
            },
            updates: {
              enabled: response.data.support_changelog !== "",
              value: response.data.support_changelog,
            },
          });

          console.log("Resource data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    }

    fetchResourceData();
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Edit Resource</h1>
              <p className="text-muted-foreground mt-2">
                Edit {resourceName} resource details
              </p>
            </div>

            <div className="space-y-6">
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
                    onClick={() => setDisplayType(0)}
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer ${
                      displayType === 0
                        ? "ring-2 ring-primary scale-[1.02]"
                        : ""
                    }`}
                  >
                    <Grid2X2 className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">Grid Layout</span>
                  </button>
                  <button
                    onClick={() => setDisplayType(1)}
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer ${
                      displayType === 1
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

              {/* Resource Content Upload - Modified to support folders and remove Add More button */}
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
                  <Button className="w-full">Edit Resource</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
