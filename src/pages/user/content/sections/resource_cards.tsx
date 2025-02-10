import { Button } from "@/components/ui/button";

export default function USER_CONTENT_Resource_Cards({
  purchasedContent,
}: {
  purchasedContent: {
    id: number;
    image: string;
    name: string;
    version: string;
    lastUpdated?: string;
    store: { name: string };
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
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1 px-4 text-sm text-center md:text-left">
              <h3 className="text-base font-semibold">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Version {item.version}
              </p>
              <p className="text-xs text-muted-foreground">
                Last Update: {item.lastUpdated || "N/A"}
              </p>
              <p className="text-sm text-green-500 font-medium mt-1">
                {item.store.name}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0 w-full md:w-auto justify-center md:justify-start">
              <Button className="px-3 py-1 text-xs  w-full md:w-auto">
                Download
              </Button>
              <Button
                variant="outline"
                className="px-3 py-1 text-xs w-full md:w-auto"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
