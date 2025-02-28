import { Button } from "@/components/ui/button";
import URLS from "@/Config/URLS";

export default function USER_CONTENT_Resource_Cards({
  purchasedContent,
}: {
  purchasedContent: {
    id: string;
    name: string;
    image_urls?: string[];
    description?: string;
    price?: number;
    owner?: string;
    downloads?: number;
    features?: string[];
    requirements?: string[];
    support_docs?: string;
    support_discord_server?: string;
    support_changelog?: string;
    support_website?: string;
    version?: string;
    lastUpdated?: string;
    store?: { name: string };
  }[];
}) {
  return (
    <>
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchasedContent.map((item) => (
          <div
            key={item.id}
            className="bg-muted rounded-xl border p-4 flex flex-col md:flex-row items-center md:items-stretch shadow-sm"
          >
            {/* Item Image */}
            <div className="w-full md:w-44 h-32 md:h-24 rounded-lg overflow-hidden">
              <img
                src={
                  item.image_urls?.[0]
                    ? `${URLS.RESOURCES_IMGS_BUCKET}/${item.image_urls[0]}`
                    : `${URLS.USER_AVATARS_BUCKET}/default.jpg`
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1 px-4 text-sm text-center md:text-left">
              <h3 className="text-base font-semibold">{item.name}</h3>
              <p className="text-xs text-muted-foreground">
                {item.description
                  ? item.description.substring(0, 50) +
                    (item.description.length > 50 ? "..." : "")
                  : ""}
              </p>
              <p className="text-sm text-green-500 font-medium mt-1">
                {item.store?.name ||
                  (item.price !== undefined ? `$${item.price.toFixed(2)}` : "")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0 w-full md:w-auto justify-center md:justify-start">
              <Button className="px-3 py-1 text-xs w-full md:w-auto">
                Download
              </Button>
              <Button
                onClick={() => window.open(`/resources/${item.id}`, "_blank")}
                variant="secondary"
                className="px-3 py-1 text-xs w-full md:w-auto"
              >
                View Details
              </Button>
              {item.support_docs && (
                <Button
                  variant="secondary"
                  className="px-3 py-1 text-xs w-full md:w-auto"
                  onClick={() => window.open(item.support_docs, "_blank")}
                >
                  Docs
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
