import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Upload, Plus, Trash2 } from "lucide-react";
import getFileIcon from "@/lib/file-extensions";

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

interface UploadedFile {
  id: string;
  file: File;
  path?: string; // Store relative path of file in folder uploads
}

interface FileUploadProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  uploadedFiles,
  setUploadedFiles,
}) => {
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        id: crypto.randomUUID(),
        path: file.webkitRelativePath || file.name, // Store relative path if available
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Handle file drop
  const handleFileDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDraggingFiles(false);

    const files = e.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        id: crypto.randomUUID(),
        path: file.webkitRelativePath || file.name,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Drag over handler
  const handleFileDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDraggingFiles(true);
  };

  // Drag leave handler
  const handleFileDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDraggingFiles(false);
  };

  // Remove file handler
  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
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
                <p className="font-medium">Drop your resource files here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse from your computer
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Files or Folders
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                webkitdirectory="true" // Enables folder selection
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
                  <p className="font-medium truncate">{file.path}</p>
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
              Add More Files or Folders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
