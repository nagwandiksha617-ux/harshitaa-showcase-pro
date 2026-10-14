import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

const META_PIXEL_ID = "1572298120852523";

/**
 * Preview-only setup check for Meta Conversions API.
 * Returns only whether the access token is configured — never the value.
 * Safe to call from the browser: the response contains no secret material.
 */
export const checkMetaCapiSetup = createServerFn({ method: "GET" }).handler(
  async () => {
    const token = process.env["META_CAPI_ACCESS_TOKEN"];
    return {
      configured: Boolean(token && token.length > 0),
      pixelId: META_PIXEL_ID,
    };
  },
);

export type MetaLeadEventInput = {
  eventId: string;
  eventSourceUrl: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
};

/**
 * Sends a server-side Lead event to Meta Conversions API.
 * Guarded: refuses to send until META_CAPI_ACCESS_TOKEN is configured,
 * so no CAPI request can fire before the secure setup is complete.
 * The token is read from the server environment only and is never
 * logged, returned, or exposed to the browser.
 */
export const sendMetaLeadEvent = createServerFn({ method: "POST" })
  .inputValidator((data: MetaLeadEventInput) => {
    if (!data || typeof data.eventId !== "string" || !data.eventId) {
      throw new Error("eventId is required");
    }
    if (typeof data.eventSourceUrl !== "string" || !data.eventSourceUrl) {
      throw new Error("eventSourceUrl is required");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const token = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!token) {
      // CAPI intentionally disabled until the secret is configured.
      return { sent: false, reason: "capi_not_configured" as const };
    }
    const clientIp =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              event_id: data.eventId,
              action_source: "website",
              event_source_url: data.eventSourceUrl,
              user_data: {
                ...(clientIp ? { client_ip_address: clientIp } : {}),
                ...(data.clientUserAgent
                  ? { client_user_agent: data.clientUserAgent }
                  : {}),
                ...(data.fbp ? { fbp: data.fbp } : {}),
                ...(data.fbc ? { fbc: data.fbc } : {}),
              },
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      // Log status only — never the token or request body.
      console.error(`Meta CAPI request failed [${response.status}]`);
      return { sent: false, reason: "capi_request_failed" as const };
    }

    return { sent: true as const };
  });
