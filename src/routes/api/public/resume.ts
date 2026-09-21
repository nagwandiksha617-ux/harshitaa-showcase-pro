import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "fs";
import { join } from "path";

// Serves the resume PDF directly from the public folder.
// This works in any deployment environment (not just Lovable's CDN).
export const Route = createFileRoute("/api/public/resume")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const pdfPath = join(process.cwd(), "public", "Harshitaa-Resume.pdf");
          const pdfBuffer = readFileSync(pdfPath);
          return new Response(pdfBuffer, {
            status: 200,
            headers: {
              "content-type": "application/pdf",
              "content-disposition": 'inline; filename="Harshitaa-Sharma-Resume.pdf"',
              "cache-control": "public, max-age=3600",
            },
          });
        } catch {
          return new Response("Resume not found", { status: 404 });
        }
      },
    },
  },
});
