import React, { useEffect, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { SwipeViews } from './react-swipe-views/index'

import { action } from '@storybook/addon-actions'
import { axisType } from './react-swipe-views/axisProperties'
import { SwipeViewsVirtual } from './react-swipe-views/SwipeViewsVirtual'

const meta: Meta<typeof SwipeViews> = {
  component: SwipeViews,
  title: 'Components/SwipeViews',
}
export default meta

type Story = StoryObj<typeof SwipeViews>

const styles = {
  slideContainer: {
    height: 200,
  },
  slide: {
    padding: 15,
    color: '#332',
    height: 200,
    boxSizing: 'border-box',
  } as unknown as React.CSSProperties,
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  slide4: {
    backgroundColor: '#6AFFC0',
  },
  slide5: {
    backgroundColor: '#FFC06A',
  },
}

const PART_ONE = (
  <>
    <h3>Part one</h3>
    <p>
      Magna ut pariatur laborum cupidatat ea elit. Ut mollit ipsum officia irure
      nostrud nostrud exercitation Lorem labore voluptate reprehenderit sit
      nisi. Amet tempor esse ut occaecat. Eu magna duis sunt dolore eu anim
      voluptate dolor duis.
    </p>
  </>
)

const PART_TWO = (
  <>
    <h3>Part two</h3>
    <p>
      Anim esse veniam fugiat pariatur. Veniam velit cupidatat ullamco occaecat
      eu cillum cupidatat velit. Officia sunt officia deserunt ad laborum sit
      non. Voluptate in esse deserunt veniam velit ex Lorem nostrud. Duis est
      occaecat culpa cillum. Consequat cillum do labore laborum aliqua irure.
      Duis non culpa tempor adipisicing pariatur deserunt eiusmod dolor elit sit
      non officia ad sint.
    </p>
  </>
)

const PART_THREE = (
  <>
    <h3>Part three</h3>
    <p>
      Eiusmod mollit officia esse elit consequat dolor mollit enim. Ullamco
      labore labore fugiat id occaecat ex sint sint nostrud laborum officia amet
      eu. Exercitation exercitation velit in pariatur velit esse labore dolor ut
      dolor non. Ad consectetur deserunt laboris dolor nulla veniam anim ex
      aliqua ad esse laboris magna. Veniam aliquip do elit duis irure minim
      officia deserunt adipisicing esse nisi cupidatat sint.
    </p>
  </>
)

const PART_FOUR = (
  <>
    <h3>Part four</h3>
    <p>
      Sunt consectetur pariatur sunt pariatur quis esse voluptate. Laboris amet
      dolore proident Lorem sunt Lorem velit ad. Tempor cupidatat ex aute
      consectetur magna. Pariatur exercitation ullamco elit deserunt aliqua
      Lorem mollit Lorem exercitation dolor. Exercitation esse nulla deserunt
      nostrud ad sit reprehenderit eu qui. In Lorem dolor id reprehenderit Lorem
      laborum id.
    </p>
  </>
)

const PART_FIVE = (
  <>
    <h3>Part five</h3>
    <p>
      Velit elit ad culpa commodo duis ea voluptate enim Lorem Lorem cillum
      cupidatat. Excepteur quis enim mollit ipsum. Sint duis dolor ut minim
      incididunt enim adipisicing cillum laborum ea. Ullamco adipisicing
      incididunt ea enim.
    </p>
  </>
)

const SLIDES = [PART_ONE, PART_TWO, PART_THREE, PART_FOUR, PART_FIVE]
const STYLES = [
  styles.slide1,
  styles.slide2,
  styles.slide3,
  styles.slide4,
  styles.slide5,
]

const args = {
  animateHeight: false,
  animateTransitions: true,
  axis: 'x' as axisType,
  enableTouchEvents: true,
  enableMouseEvents: true,
  enableKeyEvents: true,
  disabled: false,
  disableLazyLoading: false,
  hysteresis: 0.6,
  ignoreNativeScroll: true,
  resistance: true,
  onChangeIndex: action('onChangeIndex'),
  onTransitionEnd: action('onTransitionEnd'),
  onScroll: action('onScroll'),
  onTouchStart: action('onTouchStart'),
  onTouchEnd: action('onTouchEnd'),
  onSwitching: action('onSwitching'),
}

export const Simple: Story = {
  name: 'Simple SwipeViews',
  args,
  render: function Render(args) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
      setIndex(args.index)
    }, [args.index])

    return (
      <SwipeViews {...args} index={index} onChangeIndex={setIndex}>
        <div style={{ ...styles.slide, ...styles.slide1 }}>{PART_ONE}</div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>{PART_TWO}</div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>{PART_THREE}</div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>{PART_FOUR}</div>
        <div style={{ ...styles.slide, ...styles.slide5 }}>{PART_FIVE}</div>
      </SwipeViews>
    )
  },
}

export const Vertical: Story = {
  name: 'Vertical SwipeViews',
  args: {
    ...args,
    axis: 'y',
  },
  render: function Render(args) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
      setIndex(args.index)
    }, [args.index])

    return (
      <SwipeViews
        {...args}
        index={index}
        containerStyle={styles.slideContainer}
        onChangeIndex={setIndex}
      >
        <div style={{ ...styles.slide, ...styles.slide1 }}>{PART_ONE}</div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>{PART_TWO}</div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>{PART_THREE}</div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>{PART_FOUR}</div>
        <div style={{ ...styles.slide, ...styles.slide5 }}>{PART_FIVE}</div>
      </SwipeViews>
    )
  },
}

export const AutoPlay: Story = {
  name: 'Auto Play SwipeViews',
  args: {
    ...args,
    autoPlay: { enabled: true, interval: 2000, direction: 'inc' },
  },
  render: function Render(args) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
      setIndex(args.index)
    }, [args.index])

    return (
      <SwipeViews {...args} index={index} onChangeIndex={setIndex}>
        <div style={{ ...styles.slide, ...styles.slide1 }}>{PART_ONE}</div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>{PART_TWO}</div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>{PART_THREE}</div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>{PART_FOUR}</div>
        <div style={{ ...styles.slide, ...styles.slide5 }}>{PART_FIVE}</div>
      </SwipeViews>
    )
  },
}

export const Virtual: Story = {
  name: 'Virtual SwipeViews',
  args,
  render: function Render(args) {
    const [index, setIndex] = useState(25)

    useEffect(() => {
      setIndex(args.index)
    }, [args.index])

    const renderSlides = (props: { index: number; key: number }) => {
      const i = props.index

      const x = i % SLIDES.length

      const slide = SLIDES[x]
      const style = STYLES[x]

      return (
        <div style={{ ...styles.slide, ...style }} key={props.key}>
          <p>{props.index}</p>
          {slide}
        </div>
      )
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
  },
}
