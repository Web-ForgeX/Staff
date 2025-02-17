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
  body?: string | Record<string, unknown> | FormData | null;
  headers?: Record<string, string>;
}) {
  try {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    const baseUrl = URLS.API;

    const authHeaders = await buildAuthHeaders();

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...authHeaders,
        ...headers,
      },
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    };

    const response = await fetch(
      `${baseUrl}${normalizedRoute}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    return contentType?.includes("application/json")
      ? response.json()
      : response.text();
  } catch (error: unknown) {
    console.error("Request failed:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
