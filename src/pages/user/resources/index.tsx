import { useAuth } from "@/hooks/user";
import { useEffect, useState } from "react";
import SendRequest from "@/API/request";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import URLS from "@/Config/URLS";
import { Button } from "@/components/ui/button";

interface Resource {
  title: string;
  image: string;
  description: string;
  id: string;
}

export default function User_Resources() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchResources = async () => {
      try {
        const route = `/resource/user/${user.id}`;
        const response = await SendRequest({ method: "GET", route });

        if (response?.data) {
          const formattedResources: Resource[] = response.data.map(
            (item: {
              name: string;
              image_urls: [string];
              description: string;
              id: string;
            }) => ({
              title: item.name,
              image: item.image_urls?.[0]
                ? `${URLS.RESOURCES_IMGS_BUCKET}/${item.image_urls[0]}`
                : "",
              description: item.description,
              id: item.id,
            }),
          );
          setResources(formattedResources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [user]);

  return (
    <div className="pt-20 pb-30">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-semibold">Your Resources</h2>
        <Button onClick={() => (window.location.href = `/resources/create`)}>
          Add Resource
        </Button>
      </div>
      <SECTION_Resource_Card_Grid
        resources={resources}
        showViewAll={false}
        title=""
      />
    </div>
  );
}
