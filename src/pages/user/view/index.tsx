import { useParams } from "react-router-dom";
import USER_VIEW_User_Info from "./sections/info";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SendRequest from "@/API/request";
import { useEffect, useState } from "react";
import Not_Found from "@/pages/404";
import { User } from "@/API/Types";
import URLS from "@/Config/URLS";

interface Resource {
  title: string;
  image: string;
  description: string;
  id: string;
}

export default function User_View() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const { name } = useParams();

  useEffect(() => {
    async function FetchUser() {
      const response = await SendRequest({
        method: "GET",
        route: `/user/name/${name?.toLowerCase()}`,
      });

      if (!response.data.error) {
        console.log(response.data);
        setUser(response.data);
      } else {
        setError(true);
      }
    }

    FetchUser();
  }, [name]);

  useEffect(() => {
    if (user) {
      document.title = `Forgex | View ${user.username}`;
    }
  }, [user]);

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

  if (error) return <Not_Found />;

  return (
    <>
      <USER_VIEW_User_Info user={user} />
      <div className="pt-10 pb-30">
        <SECTION_Resource_Card_Grid
          resources={resources}
          title="Resources"
          showViewAll={false}
        />
      </div>
    </>
  );
}
