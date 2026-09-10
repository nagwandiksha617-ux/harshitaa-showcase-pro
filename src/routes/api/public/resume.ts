import { createFileRoute } from "@tanstack/react-router";

// Serves the resume PDF from the site's own origin so browsers display it
// directly instead of blocking it (the CDN's strict CSP blocks PDF viewers).
export const Route = createFileRoute("/api/public/resume")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const assetUrl = `${origin}/__l5e/assets-v1/31614877-ac1c-4b58-abf4-0f80562108de/harshitaa-sharma-resume.pdf`;
        const upstream = await fetch(assetUrl);
        if (!upstream.ok || !upstream.body) {
          return new Response("Resume not found", { status: 404 });
        }
        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type": "application/pdf",
            "content-disposition": 'inline; filename="Harshitaa-Sharma-Resume.pdf"',
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
