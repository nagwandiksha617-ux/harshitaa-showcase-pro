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
  const [testCode, setTestCode] = useState("");

  useEffect(() => {
    try {
      setTestCode(window.localStorage.getItem("meta_test_event_code") ?? "");
    } catch {
      /* storage unavailable */
    }
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
      <label className="mt-3 block text-muted-foreground" htmlFor="meta-test-code">
        Test event code (optional)
      </label>
      <input
        id="meta-test-code"
        value={testCode}
        onChange={(e) => {
          const v = e.target.value.trim();
          setTestCode(v);
          try {
            if (v) window.localStorage.setItem("meta_test_event_code", v);
            else window.localStorage.removeItem("meta_test_event_code");
          } catch {
            /* storage unavailable */
          }
        }}
        placeholder="TEST12345"
        className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-foreground"
      />
      <p className="mt-1 text-[10px] text-muted-foreground">
        {testCode ? "Server Leads will appear in Test Events." : "Paste the code from Events Manager → Test Events."}
      </p>
    </div>
  );
}
