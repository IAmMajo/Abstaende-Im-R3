import { defineConfig } from "astro/config";

import lit from "@astrojs/lit";

export default defineConfig({
  integrations: [lit()],
  head: {
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/static/favicon.ico",
      },
    ],
  },
});