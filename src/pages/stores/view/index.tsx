import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import STORE_VIEW_Store_Info from "./sections/store_info";
import STORE_VIEW_Store_Members from "./sections/store_members";
import STORE_VIEW_Store_Settings from "./sections/store_settings";
import { Package, Users, Settings, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SendRequest from "@/API/request";
import { Store } from "@/API/stores/types";
import { useAuth } from "@/hooks/user";

export default function Store_View() {
  const { name } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("resources");
  const [storeData, setStoreData] = useState<Store | null>(null);
  const [owner, setOwner] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (
      tabFromUrl &&
      ["resources", "members", "settings"].includes(tabFromUrl)
    ) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    async function fetchStoreData() {
      const response = await SendRequest({
        method: "GET",
        route: `/store/${name}`,
      });
      if (!response.error) {
        setStoreData(response.data);
        if (response.data.owner === user?.id) {
          setOwner(true);
        }
      }
    }
    fetchStoreData();
  }, [name]);

  return (
    <div>
      {/* Full width banner */}
      <div className="w-full">
        <STORE_VIEW_Store_Info store={storeData} />
      </div>

      <div className="mt-4 mx-8 md:mx-20 pb-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            <div className="flex justify-between items-center max-w-[95%] md:max-w-full mx-auto mb-4">
              <div></div>

              {owner && (
                <Button>
                  <Link
                    className="flex items-center gap-2"
                    to={`/resources/create?store=${storeData?.id}`}
                  >
                    <Plus size={16} /> Add Resource
                  </Link>
                </Button>
              )}
            </div>
            <div className="max-w-[95%] md:max-w-full mx-auto">
              <SECTION_Resource_Card_Grid
                resources={storeData?.resources}
                showViewAll={false}
                per_row={4}
                title="Store Resources"
              />
            </div>
          </TabsContent>
          <TabsContent value="members" className="text-center">
            <div className="mt-4">
              <STORE_VIEW_Store_Members
                memberIds={storeData?.members || []}
                storeOwnerId={storeData?.owner}
                isOwner={owner}
              />
            </div>
          </TabsContent>

          {owner && (
            <TabsContent value="settings" className="text-center">
              <div className="mt-4">
                <STORE_VIEW_Store_Settings />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
