import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import URLS from "@/Config/URLS";

export default function SECTION_Users_Stores({
  controls = false,
}: {
  controls?: boolean;
}) {
  const loading = false;

  const stores = [
    {
      id: "61eb8773-bcb6-424f-ba66-ebaf24c71e03",
      name: "Tech Haven",
      bio: "Your one-stop shop for the latest gadgets and tech accessories.",
      picture: "tech-haven-avatar.jpg",
      banner: "tech-haven-banner.jpg",
      owner: 1, // assuming user with id 1 owns this store
    },
    {
      id: "7122efd0-3347-49cc-9576-ab7c56d7ec10",
      name: "Artisan Boutique",
      bio: "Handcrafted items with love, from our artisans to your home.",
      picture: "artisan-boutique-avatar.jpg",
      banner: "artisan-boutique-banner.jpg",
      owner: 2, // assuming user with id 2 owns this store
    },
    {
      id: "d501b962-cf02-4cdd-a2b2-4c460565d28c",
      name: "Eco Essentials",
      bio: "Sustainable and eco-friendly products for a better planet.",
      picture: "eco-essentials-avatar.jpg",
      banner: "eco-essentials-banner.jpg",
      owner: 4, // assuming user with id 4 owns this store
    },
  ];

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-lg p-4 animate-pulse"
            >
              <div className="w-full h-24 bg-gray-300 rounded-md"></div>
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full -mt-12 border-4 border-background"></div>
                <div className="h-4 w-32 bg-gray-300 rounded mt-2"></div>
                <div className="h-3 w-40 bg-gray-300 rounded mt-2"></div>
                <div className="flex gap-2 mt-4">
                  <div className="w-10 h-10 bg-gray-300 rounded"></div>
                  <div className="w-10 h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : stores.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You have no stores yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 border-border overflow-hidden"
            >
              <img
                src={`${URLS.STORE_BANNER_BUCKET}/${store.id}.png`}
                alt={`${store.name} banner`}
                className="w-full h-24 object-cover border-b-2 border-border"
              />
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src={`${URLS.STORE_AVATAR_BUCKET}/${store.id}.png`}
                  alt={store.name}
                  className="w-20 h-20 rounded-full object-cover -mt-12 border-2 border-border"
                />
                <h2 className="text-lg font-semibold mt-2">{store.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {store.bio}
                </p>

                {controls ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        (window.location.href = `/stores/view/${store.name}?tab=settings`)
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Eye
                        className="w-4 h-4"
                        onClick={() =>
                          (window.location.href = `/stores/view/${store.name}`)
                        }
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
