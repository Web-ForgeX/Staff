import { useParams } from "react-router-dom";
import USER_VIEW_User_Info from "./sections/info";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SendRequest from "@/API/request";
import { useEffect, useState } from "react";
import Not_Found from "@/pages/404";
import { User } from "@/API/Types";

export default function User_View() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
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

  if (error) return <Not_Found />;
  return (
    <>
      <USER_VIEW_User_Info user={user} />
      <div className="pt-10 pb-30">
        <SECTION_Resource_Card_Grid
          resources={[]}
          title="Resources"
          showViewAll={false}
        />
      </div>
    </>
  );
}
