import { Button } from "@/components/ui/button";
import { AlertCircle, Download, ExternalLink } from "lucide-react";

export default function USER_CONTENT_Resource_Cards({
  purchasedContent,
}: {
  purchasedContent: {
    id: number;
    image: string;
    name: string;
    version: string;
    lastUpdated?: string;
    store: { name: string; avatar: string };
  }[];
}) {
  return (
    <>
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchasedContent.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Item Image */}
              <div className="w-full md:w-56 h-40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 text-sm">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <div className="mt-2 text-xs text-muted-foreground flex flex-col gap-1">
                  <div className="flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Version {item.version}
                  </div>
                  <p>Last Updated: {item.lastUpdated || "N/A"}</p>
                  <div className="flex items-center">
                    <img
                      src={item.store.avatar}
                      alt={item.store.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <p>{item.store.name}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col gap-2 md:w-auto text-xs">
                <Button className="flex-1 px-3 py-1 text-xs rounded-lg">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 px-3 py-1 text-xs rounded-lg"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
