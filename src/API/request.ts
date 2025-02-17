import supabase from "./supabase";
import URLS from "@/Config/URLS";

export async function buildAuthHeaders() {
  const acctoken = (await supabase.auth.getSession()).data.session
    ?.access_token;
  return {
    Authorization: `Bearer ${acctoken}`,
  };
}

export default async function SendRequest({
  method = "GET",
  route,
  body = null,
  headers = {},
}: {
  method?: string;
  route: string;
  body?: any;
  headers?: Record<string, string>;
}) {
  try {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    const baseUrl = URLS.API;

    const authHeaders = await buildAuthHeaders();

    // Define request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }), // Only set Content-Type for JSON
        ...authHeaders,
        ...headers,
      },
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null, // Set FormData directly
    };

    // Make the request
    const response = await fetch(
      `${baseUrl}${normalizedRoute}`,
      requestOptions,
    );

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Return response data (try parsing JSON if possible)
    const contentType = response.headers.get("content-type");
    return contentType?.includes("application/json")
      ? response.json()
      : response.text();
  } catch (error) {
    console.error("Request failed:", error);
    return { error: error.message };
  }
}
