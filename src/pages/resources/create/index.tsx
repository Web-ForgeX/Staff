import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Image as ImageIcon,
  Grid2X2,
  LayoutGrid,
  GripHorizontal,
  Plus,
  X,
  FileText,
  MessageSquare,
  Globe,
  Book,
  RefreshCw,
  File,
  Trash2,
  Shield,
  Settings,
  Users,
  Check,
} from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
}

interface DiscordServer {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  roles: DiscordRole[];
}

interface DiscordRole {
  id: string;
  name: string;
  color: string;
}

export default function Resource_Create() {
  const [displayType, setDisplayType] = useState<"grid" | "list">("grid");
  const [images, setImages] = useState<string[]>([]);
  const [draggedImage, setDraggedImage] = useState<number | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [supportOptions, setSupportOptions] = useState({
    documentation: { enabled: false, value: "" },
    discord: { enabled: false, value: "" },
    website: { enabled: false, value: "" },
    updates: { enabled: false, value: "" },
  });
  const dragRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Mock data - would come from API in real app
  const stores = [
    {
      id: "1",
      name: "PixelCraft Studios",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50",
    },
    {
      id: "2",
      name: "GameForge",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50",
    },
  ];

  const discordServers: DiscordServer[] = [
    {
      id: "1",
      name: "Gaming Community",
      icon: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=50&h=50",
      memberCount: 1234,
      roles: [
        { id: "role1", name: "Premium Member", color: "#FFD700" },
        { id: "role2", name: "VIP", color: "#FF0000" },
        { id: "role3", name: "Supporter", color: "#00FF00" },
      ],
    },
    {
      id: "2",
      name: "Developer Hub",
      icon: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=50&h=50",
      memberCount: 567,
      roles: [
        { id: "role4", name: "Resource Creator", color: "#0000FF" },
        { id: "role5", name: "Premium Dev", color: "#800080" },
      ],
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDragStart = (index: number, e: React.DragEvent) => {
    setDraggedImage(index);

    const emptyImg = document.createElement("img");
    e.dataTransfer.setDragImage(emptyImg, 0, 0);

    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.5";
    target.style.transform = "scale(1.05)";

    if (dragRef.current) {
      const clone = target.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.top = "-1000px";
      clone.style.left = "-1000px";
      clone.style.opacity = "0.8";
      clone.style.pointerEvents = "none";
      clone.style.width = `${target.offsetWidth}px`;
      clone.style.height = `${target.offsetHeight}px`;
      dragRef.current.appendChild(clone);

      const handleDragMove = (moveEvent: MouseEvent) => {
        if (clone) {
          clone.style.top = `${moveEvent.clientY - target.offsetHeight / 2}px`;
          clone.style.left = `${moveEvent.clientX - target.offsetWidth / 2}px`;
        }
      };

      document.addEventListener("mousemove", handleDragMove);

      e.currentTarget.addEventListener(
        "dragend",
        () => {
          document.removeEventListener("mousemove", handleDragMove);
          if (clone && dragRef.current) {
            dragRef.current.removeChild(clone);
          }
        },
        { once: true },
      );
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    target.style.transform = "scale(1)";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1.05)";
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1)";
  };

  const handleDrop = (targetIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedImage === null) return;

    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1)";

    const newImages = [...images];
    const [movedImage] = newImages.splice(draggedImage, 1);
    newImages.splice(targetIndex, 0, movedImage);

    setImages(newImages);
    setDraggedImage(null);
  };

  const handleListChange = (
    index: number,
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const addListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList([...list, ""]);
  };

  const removeListItem = (
    index: number,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.length > 1) {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
    }
  };

  const toggleSupportOption = (option: keyof typeof supportOptions) => {
    setSupportOptions((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        enabled: !prev[option].enabled,
      },
    }));
  };

  const updateSupportValue = (
    option: keyof typeof supportOptions,
    value: string,
  ) => {
    setSupportOptions((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        value,
      },
    }));
  };

  // New file upload handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        id: crypto.randomUUID(),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFiles(false);

    const files = e.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        id: crypto.randomUUID(),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFiles(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFiles(false);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return (
          <FileText className="h-10 w-10 p-2 text-red-500 bg-red-500/30" />
        );
      case "zip":
      case "rar":
        return (
          <File className="h-10 w-10 p-2 text-yellow-500 bg-yellow-500/30" />
        );
      default:
        return (
          <File className="h-10 w-10 p-2 rounded text-primary bg-primary/30" />
        );
    }
  };

  return (
    <>
      <div ref={dragRef} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Create New Resource</h1>
              <p className="text-muted-foreground mt-2">
                Add a new resource to your store
              </p>
            </div>

            <div className="space-y-6">
              {/* Store Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Store</label>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a store">
                      {selectedStore ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              stores.find((s) => s.id === selectedStore)?.avatar
                            }
                            alt=""
                            className="w-6 h-6 rounded-full"
                          />
                          <span>
                            {stores.find((s) => s.id === selectedStore)?.name}
                          </span>
                        </div>
                      ) : (
                        "Select a store"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem
                        key={store.id}
                        value={store.id}
                        className="flex items-center gap-3 p-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={store.avatar}
                            alt={store.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{store.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full mt-1.5 rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Describe your resource..."
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
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Features</label>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleListChange(
                            index,
                            e.target.value,
                            features,
                            setFeatures,
                          )
                        }
                        placeholder="Enter a feature..."
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeListItem(index, features, setFeatures)
                        }
                        disabled={features.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addListItem(features, setFeatures)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Requirements</label>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          handleListChange(
                            index,
                            e.target.value,
                            requirements,
                            setRequirements,
                          )
                        }
                        placeholder="Enter a requirement..."
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeListItem(index, requirements, setRequirements)
                        }
                        disabled={requirements.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addListItem(requirements, setRequirements)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </div>

              {/* Support Options */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Support Options</label>
                <div className="space-y-4">
                  {/* Documentation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        <span>Documentation</span>
                      </div>
                      <Button
                        variant={
                          supportOptions.documentation.enabled
                            ? "default"
                            : "outline"
                        }
                        onClick={() => toggleSupportOption("documentation")}
                      >
                        {supportOptions.documentation.enabled
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>
                    {supportOptions.documentation.enabled && (
                      <Input
                        value={supportOptions.documentation.value}
                        onChange={(e) =>
                          updateSupportValue("documentation", e.target.value)
                        }
                        placeholder="Enter documentation URL..."
                      />
                    )}
                  </div>

                  {/* Discord Server */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span>Discord Server</span>
                      </div>
                      <Button
                        variant={
                          supportOptions.discord.enabled ? "default" : "outline"
                        }
                        onClick={() => toggleSupportOption("discord")}
                      >
                        {supportOptions.discord.enabled
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>
                    {supportOptions.discord.enabled && (
                      <Input
                        value={supportOptions.discord.value}
                        onChange={(e) =>
                          updateSupportValue("discord", e.target.value)
                        }
                        placeholder="Enter Discord server invite URL..."
                      />
                    )}
                  </div>

                  {/* Website */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span>Website</span>
                      </div>
                      <Button
                        variant={
                          supportOptions.website.enabled ? "default" : "outline"
                        }
                        onClick={() => toggleSupportOption("website")}
                      >
                        {supportOptions.website.enabled
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>
                    {supportOptions.website.enabled && (
                      <Input
                        value={supportOptions.website.value}
                        onChange={(e) =>
                          updateSupportValue("website", e.target.value)
                        }
                        placeholder="Enter website URL..."
                      />
                    )}
                  </div>

                  {/* Updates */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        <span>Updates</span>
                      </div>
                      <Button
                        variant={
                          supportOptions.updates.enabled ? "default" : "outline"
                        }
                        onClick={() => toggleSupportOption("updates")}
                      >
                        {supportOptions.updates.enabled
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>
                    {supportOptions.updates.enabled && (
                      <Input
                        value={supportOptions.updates.value}
                        onChange={(e) =>
                          updateSupportValue("updates", e.target.value)
                        }
                        placeholder="Enter update policy or changelog URL..."
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Display Type Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Display Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDisplayType("grid")}
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all ${
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
                    className={`flex-1 aspect-video flex flex-col items-center justify-center gap-2 rounded-lg border bg-card hover:bg-accent/50 transition-all ${
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

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Resource Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(index, e)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(index, e)}
                      className="relative aspect-square rounded-lg border bg-card overflow-hidden group cursor-move transition-all duration-200"
                    >
                      <img
                        src={image}
                        alt={`Resource preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/80 text-background opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="flex items-center gap-2">
                          <GripHorizontal className="h-5 w-5" />
                          <p className="text-sm font-medium">Drag to reorder</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <label className="aspect-square rounded-lg border border-dashed bg-card hover:bg-accent/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Add Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Drag images to reorder. First image will be the main display
                  image.
                </p>
              </div>

              {/* Resource Content Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Resource Content</label>
                <div
                  className={`border-2 border-dashed rounded-lg transition-colors ${
                    isDraggingFiles
                      ? "border-primary bg-primary/5"
                      : uploadedFiles.length > 0
                        ? "border-border bg-card"
                        : "border-border"
                  }`}
                  onDragOver={handleFileDragOver}
                  onDragLeave={handleFileDragLeave}
                  onDrop={handleFileDrop}
                >
                  {uploadedFiles.length === 0 ? (
                    <div className="p-8">
                      <div className="flex flex-col items-center gap-4">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <div className="text-center">
                          <p className="font-medium">
                            Drop your resource files here
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            or click to browse from your computer
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select Files
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg group hover:bg-accent transition-colors"
                        >
                          {getFileIcon(file.file.name)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {file.file.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.file.size)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Files
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 fill-primary"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Discord</title>
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                      <span className="font-medium">Discord Integration</span>
                    </div>
                    <Button
                      variant={discordEnabled ? "default" : "outline"}
                      onClick={() => setDiscordEnabled(!discordEnabled)}
                    >
                      {discordEnabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>

                  {discordEnabled && (
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {discordServers.map((server) => (
                          <button
                            key={server.id}
                            onClick={() => setSelectedServer(server.id)}
                            className={`flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all ${
                              selectedServer === server.id
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                          >
                            <img
                              src={server.icon}
                              alt={server.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1 text-left">
                              <h3 className="font-medium">{server.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {server.memberCount.toLocaleString()} members
                              </div>
                            </div>
                            {selectedServer === server.id && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>

                      {selectedServer && (
                        <div className="space-y-4 bg-card border rounded-lg p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Shield className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Role Assignment</h3>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Settings className="h-5 w-5 text-muted-foreground" />
                              <span>When user purchases, assign role:</span>
                            </div>

                            <Select
                              value={selectedRole}
                              onValueChange={setSelectedRole}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role to assign">
                                  {selectedRole ? (
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                          backgroundColor: discordServers
                                            .find(
                                              (s) => s.id === selectedServer,
                                            )
                                            ?.roles.find(
                                              (r) => r.id === selectedRole,
                                            )?.color,
                                        }}
                                      />
                                      <span>
                                        {
                                          discordServers
                                            .find(
                                              (s) => s.id === selectedServer,
                                            )
                                            ?.roles.find(
                                              (r) => r.id === selectedRole,
                                            )?.name
                                        }
                                      </span>
                                    </div>
                                  ) : (
                                    "Select a role"
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {discordServers
                                  .find((s) => s.id === selectedServer)
                                  ?.roles.map((role) => (
                                    <SelectItem
                                      key={role.id}
                                      value={role.id}
                                      className="flex items-center gap-2"
                                    >
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: role.color }}
                                      />
                                      {role.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button className="w-full">Create Resource</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
