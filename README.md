# React Swipe Views

## Introduction
A replacement package for react-swipeable-views with the support for React 18, functional components and typescript.


## Installation

Install like any other npm package:
```sh
npm install --save react-swipe-views
```

## Use

### Base library

```ts
import React from 'react'
import SwipeViews from 'react-swipe-views'

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

export const App = () => (
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
```