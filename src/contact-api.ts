const configuredApiBase = import.meta.env.VITE_API_BASE_URL;
const apiBase = (configuredApiBase || (import.meta.env.DEV ? "http://localhost:8080" : "")).replace(/\/$/, "");

export type AvailableSlot = { startsAt: string; available: boolean };
export type Submission = {
  name: string;
  email: string;
  company?: string;
  need?: string[];
  needOther?: string;
  timeline?: string;
  message?: string;
  topic?: string;
  startsAt?: string;
  timezone?: string;
  website?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBase}${path}`, init);
  } catch {
    throw new Error("The contact service is unavailable. Please try again shortly.");
  }
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("The API returned a webpage instead of JSON. Check VITE_API_BASE_URL and the backend route configuration.");
  }
  const result = await response.json() as {
    success: boolean;
    data: T | null;
    error: { code: string; message: string } | null;
  };
  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || `Request failed (${response.status}).`);
  }
  if (result.data === null) throw new Error("The API response did not include data.");
  return result.data;
}

export async function getAvailableSlots(month: string): Promise<AvailableSlot[]> {
  const result = await request<{ slots: AvailableSlot[] }>(`/api/slots?month=${encodeURIComponent(month)}`);
  return result.slots;
}

export function submitContact(kind: "booking" | "brief", submission: Submission) {
  return request<{ received: boolean }>(`/api/${kind === "booking" ? "bookings" : "briefs"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
}
