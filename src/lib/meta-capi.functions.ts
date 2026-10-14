import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

const META_PIXEL_ID = "1572298120852523";

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
 *
 * The optional Meta Test Events code is read server-side from the
 * META_TEST_EVENT_CODE secret — never from the browser — so test
 * configuration never appears in the website UI or in visitor code.
 */
export const sendMetaLeadEvent = createServerFn({ method: "POST" })
  .inputValidator((data: MetaLeadEventInput) => {
    if (!data || typeof data.eventId !== "string" || !data.eventId) {
      throw new Error("eventId is required");
    }
    if (typeof data.eventSourceUrl !== "string" || !data.eventSourceUrl) {
      throw new Error("eventSourceUrl is required");
    }
    const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const clientUserAgent = text(data.clientUserAgent);
    const fbp = text(data.fbp);
    const fbc = text(data.fbc);
    return {
      eventId: data.eventId,
      eventSourceUrl: data.eventSourceUrl,
      ...(clientUserAgent ? { clientUserAgent } : {}),
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    };
  })
  .handler(async ({ data }) => {
    const token = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!token) {
      // CAPI intentionally disabled until the secret is configured.
      return { sent: false, reason: "capi_not_configured" as const };
    }

    // Test Events code comes from the server secret only. A visitor (or the
    // page) can neither read it nor set it.
    const rawCode = (process.env["META_TEST_EVENT_CODE"] ?? "").trim();
    // Meta issues codes like "TEST-759184157147951-1", so hyphens must be allowed.
    const testEventCode = /^TEST[A-Z0-9-]{1,40}$/i.test(rawCode) ? rawCode : undefined;

    const clientIp =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(testEventCode ? { test_event_code: testEventCode } : {}),
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
      // Log status and Meta's error message only — never the token or body.
      let msg = "";
      try {
        msg = ((await response.json()) as { error?: { message?: string } }).error?.message ?? "";
      } catch {
        /* ignore */
      }
      console.error(`Meta CAPI request failed [${response.status}] ${msg}`);
      return { sent: false, reason: "capi_request_failed" as const, status: response.status };
    }

    return { sent: true as const };
  });
