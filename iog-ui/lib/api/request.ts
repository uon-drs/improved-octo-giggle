import { apiUrl as apiUrl } from "@/constants"
import { ApiError } from "./error";
import { cookies } from "next/headers";

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  download?: boolean;
  cache?: RequestCache;
  next?: { revalidate: number };
}

const request = async <T>(url: string, options: RequestOptions = {}) => {

  const headers: HeadersInit = {
    Referer: process.env.BACKEND_URL ?? "",
    ...(options.headers || {}),
  };

  const response = await fetch(`${apiUrl}/${url}`, {
    method: options.method || "GET",
    headers: headers,
    body: options.body,
    cache: options.cache,
    next: options.next,
  });
  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    let errorMessage = "An error occurred";
    if (contentType && contentType.includes("application/json")) {
      try {
        const errorResponse = await response.json();
        if (Array.isArray(errorResponse)) {
          errorMessage = errorResponse.join(" * ");
        } else {
          errorMessage = errorResponse.detail || errorMessage;
        }
      } catch (error) {
        errorMessage = "Failed to parse error response";
      }
    }
    throw new ApiError(errorMessage, response.status);
  }

  if (options.download) {
    return response.blob() as unknown as T;
  }

  if (response.status === 204) {
    return {} as T;
  }

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

export default request;