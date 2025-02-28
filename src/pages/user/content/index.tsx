import { useEffect, useState } from "react";
import USER_CONTENT_Stats_Cards from "./sections/stats_card";
import USER_CONTENT_Resource_Cards from "./sections/resource_cards";
import SendRequest from "@/API/request";

// Define the structure of purchased content
interface PurchasedContent {
  id: string;
  name: string;
  image_urls: string[];
  description: string;
  owner: string;
  price: number;
  downloads: number;
  layout: number;
  approved: boolean;
  features: string[];
  requirements: string[];
  support_docs: string;
  support_discord_server: string;
  support_changelog: string;
  support_website: string;
  discord_integration: string | null;
}

export default function User_Content() {
  const [purchasedContent, setPurchasedContent] = useState<PurchasedContent[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserContent() {
      try {
        setIsLoading(true);
        const response = await SendRequest({
          method: "GET",
          route: "/user/content",
        });

        if (response.error) {
          setError(response.error);
        } else {
          console.log(response.data);
          setPurchasedContent(response.data || []);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user content",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserContent();
  }, []);

  // Calculate total price (ensure every item has a valid price)
  const totalPrice: number = purchasedContent.reduce(
    (sum, item) => sum + (item.price || 0),
    0,
  );

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

        {/* Pass amount and totalSpent to stats */}
        <USER_CONTENT_Stats_Cards
          amount={purchasedContent.length}
          price={totalPrice}
        />

        {/* Content Display */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading content</p>
          </div>
        ) : purchasedContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You haven't purchased any content yet.
            </p>
          </div>
        ) : (
          <USER_CONTENT_Resource_Cards purchasedContent={purchasedContent} />
        )}
      </div>
    </div>
  );
}
