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
} from "lucide-react";

export default function Resource_Create() {
  const [displayType, setDisplayType] = useState<"grid" | "list">("grid");
  const [images, setImages] = useState<string[]>([]);
  const [draggedImage, setDraggedImage] = useState<number | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const dragRef = useRef<HTMLDivElement>(null);

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

    // Hide the browser's default ghost image
    const emptyImg = document.createElement("img");
    e.dataTransfer.setDragImage(emptyImg, 0, 0);

    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.5";
    target.style.transform = "scale(1.05)";

    // Create a clone of the dragged element for the custom ghost image
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

      // Update ghost image position during drag
      const handleDragMove = (moveEvent: MouseEvent) => {
        if (clone) {
          clone.style.top = `${moveEvent.clientY - target.offsetHeight / 2}px`;
          clone.style.left = `${moveEvent.clientX - target.offsetWidth / 2}px`;
        }
      };

      document.addEventListener("mousemove", handleDragMove);

      // Cleanup
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
                <div className="border-2 border-dashed rounded-lg p-8">
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
                    <Button variant="outline">Select Files</Button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button className="w-full">Create Resource</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
