import type { StorybookConfig } from '@storybook/nextjs-vite';

const isCI = Boolean(process.env.CI);

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    ...(isCI ? [] : ["@storybook/addon-vitest"]),
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    ...(isCI ? [] : ["@storybook/addon-mcp"]),
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: [
    "../public"
  ],
};
export default config;