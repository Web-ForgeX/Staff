import { useParams } from "react-router-dom";
import USER_VIEW_User_Info from "./sections/info";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SendRequest from "@/API/request";
import { useEffect, useState } from "react";
import Not_Found from "@/pages/404";
export default function User_View() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function FetchUser() {
      const response = await SendRequest({
        method: "GET",
        route: `/user/id/${id}`,
      });

      console.log(response.data.error);
      if (!response.data.error) {
        setUser(response.data.data);
      } else if (response.data.error) {
        setError(true);
      }
    }

    FetchUser();
  }, [id]);

  if (error) return <Not_Found />;
  return (
    <>
      <USER_VIEW_User_Info user={user} />
      <div className="pt-10 pb-30">
        <SECTION_Resource_Card_Grid
          resources={[]}
          title="Users Resources"
          showViewAll={false}
        />
      </div>
    </>
  );
}
