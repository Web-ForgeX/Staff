import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info,
  FileText,
  LayoutGrid,
  LayoutList,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import SendRequest from "@/API/request";
import URLS from "@/Config/URLS";
import VerifiedBadge from "@/components/ui/verified";
import Not_Found from "@/pages/404";

// Define TypeScript interfaces for our data structures
interface ResourceData {
  id: string;
  name: string;
  image_urls: string[];
  description: string;
  owner: string;
  price: number;
  downloads: number;
  layout: number;
  approved: boolean;
  features: string[];
  requirements: string[];
  support_docs: string;
  support_discord_server: string;
  support_changelog: string;
  support_website: string;
  discord_integration: string | null;
}

interface CreatorData {
  id: string;
  username: string;
  picture: string;
  verified: boolean;
}

export default function Resource_View(): React.ReactNode {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [viewLayout, setViewLayout] = useState<number>(0);
  const [resource, setResource] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creatorInfo, setCreatorInfo] = useState<CreatorData | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchResource = async (): Promise<void> => {
      if (!id) {
        setError("No resource ID provided!");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await SendRequest({
          route: `/resource/id/${id}`,
        });

        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setResource(result.data);
          // Set view layout based on resource's preferred layout if available
          if (result.data.layout !== undefined) {
            setViewLayout(result.data.layout);
          }

          // Fetch creator info if we have owner ID
          if (result.data.owner) {
            fetchCreatorInfo(result.data.owner);
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch resource data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCreatorInfo = async (ownerId: string): Promise<void> => {
      try {
        const result = await SendRequest({
          route: `/user/id/${ownerId}`,
        });

        if (!result.error && result.data) {
          setCreatorInfo(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch creator info:", err);
      }
    };

    fetchResource();
  }, [id]);

  const nextImage = (): void => {
    if (!resource || !resource.image_urls || resource.image_urls.length === 0)
      return;
    setCurrentImage((prev) => (prev + 1) % resource.image_urls.length);
  };

  const prevImage = (): void => {
    if (!resource || !resource.image_urls || resource.image_urls.length === 0)
      return;
    setCurrentImage(
      (prev) =>
        (prev - 1 + resource.image_urls.length) % resource.image_urls.length,
    );
  };

  // Function to get full image URL
  const getImageUrl = (imagePath: string): string => {
    return `${URLS.RESOURCES_IMGS_BUCKET}/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-3xl">
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
          <div className="h-60 bg-gray-300 animate-pulse rounded" />
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return <Not_Found />;
  }

  // Handle case where there are no images
  const hasImages = resource.image_urls && resource.image_urls.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{resource.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-muted-foreground">
              <Download className="h-5 w-5 mr-1" />
              {resource.downloads.toLocaleString()} downloads
            </div>
            <div className="ml-4 text-muted-foreground">
              ${resource.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Layout Toggle - Only show if there are images */}
        {hasImages && (
          <div className="mb-4 flex justify-end">
            <div className="flex items-center space-x-2 bg-card rounded-lg p-1">
              <button
                onClick={() => setViewLayout(0)}
                className={`p-2 rounded-md ${
                  viewLayout === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent cursor-pointer"
                }`}
                title="Grid Layout"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewLayout(1)}
                className={`p-2 rounded-md ${
                  viewLayout === 1
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
                title="Column Layout"
              >
                <LayoutList className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery - Only show if there are images */}
            {hasImages && viewLayout === 0 && (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(resource.image_urls[currentImage])}
                    alt={resource.name}
                    className="w-full aspect-video object-cover"
                  />
                  {resource.image_urls.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
                {resource.image_urls.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {resource.image_urls.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`relative rounded-lg overflow-hidden aspect-video ${
                          currentImage === index ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <img
                          src={getImageUrl(image)}
                          alt={`${resource.name} preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Column Image Layout - Only show if there are images */}
            {hasImages && viewLayout === 1 && (
              <div className="space-y-4">
                {resource.image_urls.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${resource.name} preview ${index + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className={`${hasImages ? "mt-8" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>

            {/* Features */}
            {resource.features && resource.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resource.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {resource.requirements && resource.requirements.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resource.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Info className="h-4 w-4 text-primary" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Support Information */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.support_docs && (
                  <div className="bg-card rounded-lg border p-4">
                    <FileText className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Documentation</p>
                    <a
                      href={resource.support_docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center mt-1"
                    >
                      View Documentation{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                {resource.support_website && (
                  <div className="bg-card rounded-lg border p-4">
                    <Info className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Website</p>
                    <a
                      href={resource.support_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center mt-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                {resource.support_discord_server && (
                  <div className="bg-card rounded-lg border p-4">
                    <MessageCircle className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Discord Support</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {resource.support_discord_server}
                    </p>
                  </div>
                )}
                {resource.support_changelog && (
                  <div className="bg-card rounded-lg border p-4">
                    <FileText className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Changelog</p>
                    <a
                      href={resource.support_changelog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center mt-1"
                    >
                      View Changelog <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-6 sticky top-20">
              {/* Price and Buttons */}
              <div className="text-3xl font-bold mb-6">
                ${resource.price.toFixed(2)}
              </div>

              <div className="space-y-4">
                <Button className="w-full">Buy Now</Button>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="border-t mt-6 pt-6">
                <div className="flex items-center text-muted-foreground">
                  <Download className="h-5 w-5 mr-2" />
                  {resource.downloads.toLocaleString()} downloads
                </div>
              </div>

              {/* Creator - Only show if we have creator info */}
              {/* Creator - Only show if we have creator info */}
              {creatorInfo && (
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-center">
                    {creatorInfo.picture ? (
                      <img
                        src={`${URLS.USER_AVATARS_BUCKET}/${creatorInfo.picture}`}
                        alt={creatorInfo.username || "Creator"}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary font-bold">
                          {(creatorInfo.username || "User")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <div className="font-semibold">
                        {creatorInfo.username || "Creator"}
                      </div>
                      {creatorInfo.verified && <VerifiedBadge />}
                    </div>
                    <Link
                      to={`/user/view/${creatorInfo.username}`}
                      className="text-primary hover:text-primary/90 transition-colors ml-2"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
