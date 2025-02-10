import USER_CONTENT_Stats_Cards from "./sections/stats_card";
import USER_CONTENT_Resource_Cards from "./sections/resource_cards";

const purchasedContent = [
  {
    id: 1,
    name: "Advanced Economy Plugin",
    description: "A comprehensive economy system for Minecraft servers",
    price: "$19.99",
    category: "Plugins",
    image:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=400&h=300",
    store: {
      name: "PixelCraft Studios",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50",
    },
    version: "2.1.0",
    lastUpdated: "2024-03-10",
  },
  {
    id: 2,
    name: "Medieval Asset Pack",
    description: "High-quality medieval themed assets and textures",
    price: "$24.99",
    category: "Assets",
    image:
      "https://images.unsplash.com/photo-1615672968435-75cd1c6a9491?auto=format&fit=crop&q=80&w=400&h=300",
    store: {
      name: "Asset Kings",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50",
    },
    version: "1.5.2",
    lastUpdated: "2024-03-13",
  },
  {
    id: 3,
    name: "RPG Quest System",
    description: "Complete quest management system with dialogue trees",
    price: "$34.99",
    category: "Scripts",
    image:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400&h=300",
    store: {
      name: "RPG Masters",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=50&h=50",
    },
    version: "3.0.1",
    lastUpdated: "2024-03-14",
  },
];
export default function User_Content() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Your Content</h1>
          <p className="text-muted-foreground mt-2">
            Access and download your purchased items
          </p>
        </div>
        <USER_CONTENT_Stats_Cards />
        <USER_CONTENT_Resource_Cards purchasedContent={purchasedContent} />
      </div>
    </div>
  );
}
