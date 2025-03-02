// Sections
import HOME_Hero from "./sections/hero";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SECTION_Features_Cards from "@/sections/features_cards";
import SendRequest from "@/API/request";
import { useEffect, useState } from "react";
import URLS from "@/Config/URLS";

// Define an interface for the resource object structure
interface Resource {
  id: string;
  title: string;
  description: string;
  author: string;
  version: string;
  link: string;
  image: string;
}

export default function HomePage() {
  // Initialize with the correct type
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        // Fetch random resources
        const randomResourcesResponse = await SendRequest({
          route: "/resource/random?count=4",
        });

        if (randomResourcesResponse.data) {
          // Create a copy of the resources data to enrich with owner info
          const resourcesWithOwners = [...randomResourcesResponse.data];

          // Fetch owner data for each resource
          await Promise.all(
            resourcesWithOwners.map(async (resource, index) => {
              const ownerResponse = await SendRequest({
                route: `/user/id/${resource.owner}`,
              });

              if (ownerResponse) {
                resourcesWithOwners[index] = {
                  ...resource,
                  ownerData: ownerResponse,
                };
              }
            }),
          );

          // Format resources data for the resource card grid
          const formattedResources = resourcesWithOwners.map((resource) => {
            // Create string URL (not an object)
            const imgSrc =
              resource.image_urls && resource.image_urls.length > 0
                ? `${URLS.RESOURCES_IMGS_BUCKET}/${resource.image_urls[0]}`
                : "https://placehold.co/600x400";

            return {
              id: resource.id,
              title: resource.name,
              description: resource.description,
              author: resource.ownerData?.data.username || "Unknown Author",
              version: resource.name.includes("v.")
                ? resource.name.split("v.")[1]
                : "",
              link: `/resource/${resource.id}`,
              // Create the image object in the exact structure expected
              image: imgSrc,
            };
          });

          setResources(formattedResources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return (
    <main className="min-h-screen">
      <HOME_Hero />
      <section className="py-12 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-lg">Loading resources...</p>
          </div>
        ) : (
          <SECTION_Resource_Card_Grid
            resources={resources || []}
            per_row={4}
            title="Trending Resources"
            showViewAll={true}
          />
        )}
      </section>
      <SECTION_Features_Cards />
    </main>
  );
}
