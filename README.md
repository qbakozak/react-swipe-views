# React Swipe Views

## Introduction
A replacement package for react-swipeable-views with the support for React 18, functional components and typescript.


## Installation

Install like any other npm package:
```sh
npm install --save @qbakozak/react-swipe-views
```

## Use

### Base library - SwipeViews

```ts
import React, { FC } from 'react'
import SwipeViews from '@qbakozak/react-swipe-views'

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
}

export const App: FC = () => (

  return (
    <SwipeViews>
      <div style={ ...styles.slide, ...styles.slide1 }>
        slide n°1
      </div>
      <div style={ ...styles.slide, ...styles.slide2 }>
        slide n°2
      </div>
      <div style={ ...styles.slide, ...styles.slide3 }>
        slide n°3
      </div>
    </SwipeViews>
  )
)
```

### Base library - SwipeViewsVirtual

```ts
import React, { FC } from 'react'
import SwipeViewsVirtual from '@qbakozak/react-swipe-views'

export const App: FC = () => (
  const [index, setIndex] = useState(25)

  const renderSlides = (props: { index: number; key: number }) => {
    // Render slide as JSX.Element here
  }

  return (
    <SwipeViewsVirtual
      {...args}
      index={index}
      onChangeIndex={setIndex}
      slideRenderer={renderSlides}
      slideCount={50}
    />
  )
}
```