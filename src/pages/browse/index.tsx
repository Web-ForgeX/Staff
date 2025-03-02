import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SendRequest from "@/API/request";
import URLS from "@/Config/URLS";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";

interface Resource {
  id: string;
  title: string;
  description: string;
  author: string;
  version: string;
  link: string;
  image: string;
}

const BrowseResourcesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function fetchResources() {
      try {
        const randomResourcesResponse = await SendRequest({
          route: "/resource/random?count=80",
        });

        if (randomResourcesResponse.data) {
          const resourcesWithOwners = [...randomResourcesResponse.data];

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

          const formattedResources = resourcesWithOwners.map((resource) => {
            const imgSrc =
              resource.image_urls && resource.image_urls.length > 0
                ? `${URLS.RESOURCES_IMGS_BUCKET}/${resource.image_urls[0]}`
                : "https://placehold.co/600x400";

            return {
              id: resource.id,
              title: resource.name,
              description: resource.description,
              author: resource.ownerData?.data.username || "Unknown Author",
              authorImage: resource.ownerData?.data.picture || "",
              version: resource.name.includes("v.")
                ? resource.name.split("v.")[1]
                : "",
              link: `/resource/${resource.id}`,
              image: imgSrc,
            };
          });

          setResources(formattedResources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    }

    fetchResources();
  }, []);

  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = resources.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Resources</h1>
          <p className="text-muted-foreground mt-2">
            Discover high-quality digital assets for your projects
          </p>
        </div>

        <div className="relative flex-1 mb-8">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10" />
        </div>

        <SECTION_Resource_Card_Grid resources={currentItems} per_row={4} />

        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => {
                if (
                  number === 1 ||
                  number === totalPages ||
                  (number >= currentPage - 1 && number <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={number}
                      variant="outline"
                      size="sm"
                      className={`w-8 h-8 ${currentPage === number ? "bg-primary/10 text-primary" : ""}`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Button>
                  );
                }
                if (
                  (number === 2 && currentPage > 3) ||
                  (number === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={number} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              },
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseResourcesPage;
