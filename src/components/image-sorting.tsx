import { useState } from "react";
import { GripHorizontal, ImageIcon } from "lucide-react";

interface ImageSortingProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImageSorting: React.FC<ImageSortingProps> = ({ images, setImages }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages([...images, ...newImages]);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, movedImage);

    setImages(updatedImages);
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Resource Images</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="relative aspect-square rounded-lg border bg-card overflow-hidden group cursor-move"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Resource ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/80 text-background opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <GripHorizontal className="h-5 w-5" />
              <p className="text-sm font-medium">Drag to reorder</p>
            </div>
          </div>
        ))}
        <label className="aspect-square rounded-lg border border-dashed bg-card hover:bg-accent/50 cursor-pointer flex flex-col items-center justify-center gap-2">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Add Image</span>
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
        Drag images to reorder. First image will be the main display image.
      </p>
    </div>
  );
};

export default ImageSorting;
