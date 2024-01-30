const path = require("path");
const dotenv = require("dotenv");

const nextConfig = {
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig),
    };
  },
};

const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(process.cwd(), "environment/.env.production")
    : path.resolve(process.cwd(), "environment/.env.development");

const env = dotenv.config({ path: envPath }).parsed;

module.exports = {
  webpack(config) {
    return {
      ...config,
    };
  },
  env,

  nextConfig,
  experimental: {
    appDir: true,
    serverActions: true,
  },
};
