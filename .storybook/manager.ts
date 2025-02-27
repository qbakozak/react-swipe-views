import { create } from '@storybook/theming'
import { addons } from '@storybook/manager-api'
import packageJson from '../package.json'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: `@qbakozak/react-swipe-views - Version ${packageJson.version}`,
  }),
})
