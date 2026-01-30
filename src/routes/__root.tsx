import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { toAbsoluteUrl } from "../components/seo/seo.utils";
import { getSiteOrigin } from "../utils/getSiteOrigin";
import { SITE } from "../components/seo/seo.constants";

export const Route = createRootRoute({
  head: () => {
    const origin = getSiteOrigin();
    const url = origin;

    const title = SITE.defaultTitle;
    const description = SITE.defaultDescription;
    const image = toAbsoluteUrl(SITE.defaultOgImage, origin);

    return {
      title,
      meta: [
        { name: "description", content: description },

        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <HeadContent />
      <div className="flex min-h-dvh justify-center bg-gray-5">
        <div className="w-full max-w-240 xl:max-w-5xl bg-gray-10">
          <Outlet />
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    </>
  );
}
