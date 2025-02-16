import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info,
  Shield,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function Resource_View() {
  const [currentImage, setCurrentImage] = React.useState(0);

  const resource = {
    title: "Advanced Economy Plugin",
    description:
      "A comprehensive economy system for Minecraft servers with support for multiple currencies, banking, shops, and advanced transaction management. Perfect for RPG and survival servers.",
    price: "$19.99",
    rating: 4.8,
    reviews: 156,
    downloads: 2341,
    creator: {
      id: "pixelcraft",
      name: "PixelCraft Studios",
      avatar:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=100&h=100",
    },
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200&h=600",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=600&h=400",
    ],
    features: [
      "Multiple currency support",
      "Advanced banking system",
      "Shop creation and management",
      "Transaction logging and rollback",
      "API for developers",
      "Regular updates and support",
    ],
    requirements: [
      "Minecraft 1.19+",
      "Spigot or Paper server",
      "2GB RAM minimum",
      "MySQL database",
    ],
    support: {
      documentation: "Comprehensive documentation included",
      updates: "Free updates for 12 months",
      response: "24-48 hour response time",
    },
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % resource.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + resource.images.length) % resource.images.length,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={resource.images[currentImage]}
                  alt={resource.title}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {resource.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative rounded-lg overflow-hidden aspect-video ${
                      currentImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${resource.title} preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>

            {/* Features */}
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

            {/* Requirements */}
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

            {/* Support Information */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-lg border p-4">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">Documentation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.support.documentation}
                  </p>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">Updates</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.support.updates}
                  </p>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <MessageSquare className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.support.response}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-6 sticky top-20">
              {/* Price and Buttons */}
              <div className="text-3xl font-bold mb-6">{resource.price}</div>

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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-bold mr-2">{resource.rating}</span>
                    <span className="text-muted-foreground">
                      ({resource.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Download className="h-5 w-5 mr-2" />
                  {resource.downloads.toLocaleString()} downloads
                </div>
              </div>

              {/* Creator */}
              <div className="border-t mt-6 pt-6">
                <div className="flex items-center">
                  <img
                    src={resource.creator.avatar}
                    alt={resource.creator.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">{resource.creator.name}</div>
                    <Link
                      to={`/store/${resource.creator.id}`}
                      className="text-primary hover:text-primary/90 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
