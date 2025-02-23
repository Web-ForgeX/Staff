import { useState } from "react";
import { GripHorizontal, ImageIcon, Trash2 } from "lucide-react";

interface ImageSortingProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImageSorting: React.FC<ImageSortingProps> = ({ images, setImages }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ];
      const newImages = Array.from(files).filter((file) =>
        allowedTypes.includes(file.type),
      );

      if (newImages.length !== Array.from(files).length) {
        alert("Only PNG, JPG, WEBP, and GIF formats are allowed.");
      }

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

  const handleDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium">Resource Images</label>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="relative aspect-square rounded-lg border bg-card overflow-hidden group cursor-move"
          >
            <GripHorizontal className="absolute top-2 left-2 text-white opacity-75" />
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleImageUpload}
            className="hidden"
          />
          <ImageIcon className="h-6 w-6" />
          <span className="text-sm">Add Image</span>
        </label>
      </div>
      <p className="text-sm text-gray-500">
        Drag images to reorder. First image will be the main display image.
      </p>
    </div>
  );
};

export default ImageSorting;
