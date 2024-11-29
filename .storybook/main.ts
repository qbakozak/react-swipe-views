import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../static'],
  async viteFinal(config, { configType }) {
    // For produciton modify base folder if needed
    if (configType === 'PRODUCTION' && process.env.SB_BASE_PATH)
      config.base = process.env.SB_BASE_PATH

    return config
  },
}
export default config
