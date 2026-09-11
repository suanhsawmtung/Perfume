import { baseUrl } from "@/config/env";
import { useEffect } from "react";

type OpenGraph = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
};

export type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;

  favicon?: string;

  og?: OpenGraph;

  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };

  jsonLd?: object | object[];

  noIndex?: boolean;
};

const SITE_URL = baseUrl; // Replace with your site's URL

export function SEO({
  title,
  description,
  canonical,
  favicon,
  og,
  twitter,
  jsonLd,
  noIndex = false,
}: SEOProps) {
  const ogKey = JSON.stringify(og ?? null);
  const twitterKey = JSON.stringify(twitter ?? null);
  const jsonLdKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    // -------------------------
    // Title
    // -------------------------

    document.title = title;

    // -------------------------
    // Helper functions
    // -------------------------

    const setMeta = (
      attribute: "name" | "property",
      key: string,
      content?: string,
    ) => {
      if (!content) return;

      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const removeMeta = (attribute: "name" | "property", key: string) => {
      document.head
        .querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
        ?.remove();
    };

    // -------------------------
    // Description
    // -------------------------

    if (description) {
      setMeta("name", "description", description);
    } else {
      removeMeta("name", "description");
    }

    // -------------------------
    // Robots
    // -------------------------

    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
    }

    // -------------------------
    // Canonical
    // -------------------------

    const canonicalUrl = canonical
      ? new URL(canonical, SITE_URL).href
      : undefined;

    let canonicalElement = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (canonicalUrl) {
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }

      canonicalElement.setAttribute("href", canonicalUrl);
    } else {
      canonicalElement?.remove();
    }

    // -------------------------
    // Favicon
    // -------------------------

    if (favicon) {
      let faviconElement =
        document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');

      if (!faviconElement) {
        faviconElement = document.createElement("link");
        faviconElement.setAttribute("rel", "icon");
        document.head.appendChild(faviconElement);
      }

      faviconElement.setAttribute("href", favicon);
    }

    // -------------------------
    // Open Graph
    // -------------------------

    setMeta("property", "og:title", og?.title ?? title);
    setMeta("property", "og:description", og?.description ?? description);
    setMeta("property", "og:type", og?.type ?? "website");

    if (og?.image) {
      setMeta("property", "og:image", og.image);
    } else {
      removeMeta("property", "og:image");
    }

    if (canonicalUrl) {
      setMeta("property", "og:url", canonicalUrl);
    } else {
      removeMeta("property", "og:url");
    }

    // -------------------------
    // Twitter / X
    // -------------------------

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", twitter?.title ?? og?.title ?? title);
    setMeta(
      "name",
      "twitter:description",
      twitter?.description ?? og?.description ?? description,
    );

    if (twitter?.image ?? og?.image) {
      setMeta("name", "twitter:image", twitter?.image ?? og?.image);
    } else {
      removeMeta("name", "twitter:image");
    }

    // -------------------------
    // JSON-LD
    // -------------------------

    document.head
      .querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="true"]')
      .forEach((element) => element.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

      schemas.forEach((schema) => {
        const script = document.createElement("script");

        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
      });
    }

    // -------------------------
    // Cleanup
    // -------------------------
    // Query fresh on unmount rather than closing over the stale
    // `existingJsonLd` list captured at the top of this effect run,
    // which would otherwise leave the final set of JSON-LD scripts
    // in the DOM when the component unmounts.

    return () => {
      document.head
        .querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="true"]')
        .forEach((element) => element.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    canonical,
    favicon,
    noIndex,
    ogKey,
    twitterKey,
    jsonLdKey,
  ]);

  return null;
}
