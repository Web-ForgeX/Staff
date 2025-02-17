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

    // Build request options
    const requestOptions: RequestInit & { body?: string } = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(await buildAuthHeaders()),
        ...headers,
      },
    };

    // Add body for non-GET requests if provided
    if (method !== "GET" && body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(
      `${baseUrl}${normalizedRoute}`,
      requestOptions,
    );

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      return response.body;
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
    return error;
  }
}
