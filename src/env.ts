import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CMS_SCHEMA_URL: z.url(),
    CMS_TOKEN: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {},
  runtimeEnv: {
    CMS_SCHEMA_URL: process.env.CMS_SCHEMA_URL,
    CMS_TOKEN: process.env.CMS_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
});
