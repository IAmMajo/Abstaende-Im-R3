import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [lit()],
  output: "server",
  adapter: cloudflare(),
});
