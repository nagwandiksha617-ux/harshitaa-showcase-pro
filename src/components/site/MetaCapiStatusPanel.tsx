import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { checkMetaCapiSetup } from "@/lib/meta-capi.functions";

type SetupStatus = {
  configured: boolean;
  pixelId: string;
};

/**
 * Preview-only Meta CAPI setup panel.
 * Rendered only in development/preview builds (import.meta.env.DEV);
 * never included in the published site. Shows whether the access token
 * is configured — never the token value.
 */
export function MetaCapiStatusPanel() {
  const checkSetup = useServerFn(checkMetaCapiSetup);
  const [status, setStatus] = useState<SetupStatus | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkSetup()
      .then((result) => setStatus(result))
      .catch(() => setError(true));
  }, [checkSetup]);

  const configured = status?.configured ?? false;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 w-64 rounded-lg border border-border bg-card/95 p-3 text-xs shadow-lg backdrop-blur"
      role="status"
      aria-label="Meta CAPI setup status (preview only)"
    >
      <p className="mb-2 font-semibold text-foreground">
        Meta CAPI setup <span className="font-normal text-muted-foreground">(preview only)</span>
      </p>
      <dl className="space-y-1 text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <dt>Access token</dt>
          <dd className={configured ? "text-green-500" : "text-amber-500"}>
            {error ? "check failed" : status ? (configured ? "configured" : "not set") : "checking…"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt>CAPI sending</dt>
          <dd className={configured ? "text-green-500" : "text-muted-foreground"}>
            {configured ? "enabled" : "disabled"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt>Pixel ID</dt>
          <dd className="text-foreground">{status?.pixelId ?? "…"}</dd>
        </div>
      </dl>
    </div>
  );
}
