import STORE_VIEW_Store_Info from "./sections/store_info";
import { Package, Users, Settings } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const sampleResources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of our platform",
    author: "Development Team",
    version: "1.0",
    link: "/guides/getting-started",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Getting Started Guide",
    },
  },
  {
    title: "API Documentation",
    description: "Complete API reference and examples",
    author: "API Team",
    version: "2.1",
    link: "/docs/api",
    image: {
      src: "https://placehold.co/600x400",
      alt: "API Documentation",
    },
  },
  {
    title: "Component Library",
    description: "UI components and design system",
    author: "Design Team",
    version: "3.2",
    link: "/components",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Component Library",
    },
  },
  {
    title: "Best Practices",
    description: "Tips and recommendations for optimal usage",
    author: "Architecture Team",
    version: "1.5",
    link: "/guides/best-practices",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Best Practices Guide",
    },
  },
];

import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";

export default function Store_View() {
  const owner = true;

  return (
    <div>
      {/* Full width banner */}
      <div className="w-full">
        <STORE_VIEW_Store_Info />
      </div>

      <div className="mt-4 mx-8 md:mx-20 pb-10">
        <Tabs defaultValue="resources">
          <TabsList className="flex justify-center md:justify-start">
            <TabsTrigger value="resources">
              <Package /> Resources
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users /> Members
            </TabsTrigger>
            {owner && (
              <TabsTrigger value="settings">
                <Settings /> Settings
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="resources" className="mt-4">
            <div className="max-w-[95%] md:max-w-full mx-auto">
              <SECTION_Resource_Card_Grid
                resources={sampleResources}
                showViewAll={false}
                per_row={4}
                title="Sample Store Resources"
              />
            </div>
          </TabsContent>
          <TabsContent value="members" className="text-center">
            <p>Members content goes here.</p>
          </TabsContent>
          {owner && (
            <TabsContent value="settings" className="text-center">
              <p>Settings content goes here.</p>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
