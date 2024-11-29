import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { SwipeViews } from './SwipeViews'
import { ISwipeViewsVirtual } from './interfaces'

export const SwipeViewsVirtual: FC<ISwipeViewsVirtual> = (props) => {
  const {
    slideRenderer,
    overscanSlideAfter = 3,
    overscanSlideBefore = 2,
    slideCount,
    onChangeIndex,
    onSwitching,
    onTransitionEnd,
    ...other
  } = props

  const [index, setIndex] = useState(props.index)
  const [indexStart, setIndexStart] = useState(props.index)
  const [indexStop, setIndexStop] = useState(props.index + overscanSlideAfter)

  const setState = useCallback(
    (indexNew: number) => {
      let start = indexStart
      let end = indexStop
      let indexTemp = indexNew

      if (indexNew < 0) indexTemp = 0
      if (indexNew > slideCount - 1) indexTemp = slideCount - 1

      if (indexTemp + overscanSlideAfter < slideCount - 1) {
        end = indexTemp + overscanSlideAfter
      } else end = slideCount

      if (indexTemp - overscanSlideBefore >= 0) {
        start = indexTemp - overscanSlideBefore
      } else start = 0

      setIndex(indexTemp)
      setIndexStart(start)
      setIndexStop(end)
    },
    [
      indexStart,
      indexStop,
      overscanSlideAfter,
      overscanSlideBefore,
      slideCount,
    ],
  )

  useEffect(() => {
    setState(props.index)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (props.index === undefined || props.index === index) return

    setState(props.index)
  }, [index, props.index, setState])

  const slides: JSX.Element[] = []

  let slideIndex = 0
  for (slideIndex = 0; slideIndex < slideCount; slideIndex += 1) {
    if (slideIndex >= indexStart && slideIndex < indexStop)
      slides.push(
        slideRenderer({
          index: slideIndex,
          key: slideIndex,
        }),
      )
    else slides.push(<Fragment key={slideIndex}></Fragment>)
  }

  return (
    <SwipeViews
      {...other}
      index={index}
      onChangeIndex={onChangeIndex}
      onSwitching={onSwitching}
      onTransitionEnd={onTransitionEnd}
    >
      {slides}
    </SwipeViews>
  )
}
