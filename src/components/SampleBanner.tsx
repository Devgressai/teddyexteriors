export function SampleBanner({ note }: { note?: string }) {
  return (
    <div role="note" className="bg-amber-50 border-y border-amber-200">
      <div className="mx-auto max-w-5xl px-6 py-3 text-xs text-amber-900">
        <strong className="font-semibold">Design-gate sample.</strong>{" "}
        {note ??
          "This page is a placeholder for the design review. It is not published, not in the sitemap, and will be replaced with real content once business facts are confirmed."}
      </div>
    </div>
  );
}
