import type { MetadataRoute } from "next";
import { get, hasUnresolvedRequirements } from "@/lib/business";

/**
 * Separate search retrieval agents from model-training agents (brief §13).
 * Training-crawler allowance is a decision deferred to the owner; defaults below allow retrieval
 * explicitly and leave training crawlers unaddressed (so they fall under `*`).
 */
export default function robots(): MetadataRoute.Robots {
  const base = get<string>("identity.domain");
  if (hasUnresolvedRequirements() || !base) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // Search-retrieval agents (allowed by default; owner may revisit)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      // Model-training agents — defer to owner input. Default: no explicit allow (falls under *).
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
