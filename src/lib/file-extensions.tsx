import {
  FileText,
  File,
  Archive,
  AppWindow,
  Code2,
  ImageIcon,
  Video,
  Music,
} from "lucide-react";

function getFileIcon(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    // Documents
    case "pdf":
    case "txt":
    case "rtf":
    case "docx":
    case "doc":
    case "xlsx":
    case "xls":
    case "ppt":
    case "pptx":
    case "odt":
    case "pages":
      return <FileText className="h-10 w-10 p-2 rounded text-red-500 bg-red-500/30" />;

    case "py":
    case "js":
    case "jsx":
    case "tsx":
    case "ts":
    case "html":
    case "css":
    case "scss":
    case "java":
    case "cpp":
    case "c":
    case "php":
    case "rb":
    case "go":
    case "rs":
    case "swift":
    case "kt":
    case "pyw":
    case "json":
    case "csv":
      return <Code2 className="h-10 w-10 p-2 rounded text-red-500 bg-red-500/30" />;

    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
    case "iso":
      return (
        <Archive className="h-10 w-10 p-2 rounded text-yellow-500 bg-yellow-500/30" />
      );

    case "exe":
    case "msi":
    case "app":
    case "dmg":
    case "deb":
    case "rpm":
      return <AppWindow className="h-10 w-10 p-2 rounded text-blue-500 bg-blue-500/30" />;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "webp":
    case "svg":
    case "ico":
      return (
        <ImageIcon className="h-10 w-10 p-2 rounded text-green-500 bg-green-500/30" />
      );

    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "wmv":
    case "flv":
    case "webm":
      return <Video className="h-10 w-10 p-2 rounded text-purple-500 bg-purple-500/30" />;

    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
    case "flac":
    case "aac":
      return <Music className="h-10 w-10 p-2 rounded text-pink-500 bg-pink-500/30" />;

    default:
      return <File className="h-10 w-10 p-2 rounded text-primary bg-primary/30" />;
  }
}

export default getFileIcon;
