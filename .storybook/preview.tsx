import { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    paddings: {
      default: 'Medium',
      values: [
        { name: 'None', value: '0px' },
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px' },
        { name: 'Large', value: '64px' },
      ],
    },
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'White', value: '#fff' },
        { name: 'Light', value: '#efefef' },
        { name: 'Dark', value: '#323232' },
      ],
    },
    a11y: {
      element: '#root',
      config: {},
      options: {},
      manual: true,
    },
    viewport: {
      viewports: {
        iphone5: {
          name: 'iPhone 5 / SE',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        iphone678: {
          name: 'iPhone 6/7/8',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        iphonex: {
          name: 'iPhone X',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
        ipad: {
          name: 'iPad',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        smalldesktop: {
          name: 'Small Desktop',
          styles: {
            width: '992px',
            height: '768px',
          },
        },
        largedesktop: {
          name: 'Large Desktop',
          styles: {
            width: '1200px',
            height: '1024px',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
