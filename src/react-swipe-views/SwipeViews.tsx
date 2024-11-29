import React, {
  useRef,
  useState,
  useEffect,
  FC,
  Children,
  createContext,
  useCallback,
  CSSProperties,
} from 'react'

import {
  axisProperties,
  styles,
  applyRotationalMatrix,
  getDomTreeShapes,
  standariseEvent,
  calculateTransitions,
  calculateNewIndex,
  updateStartIndex,
  findNativeHandler,
  getKeyAction,
  getSlideCount,
  computeIndex,
  mod,
} from '../react-swipe-views-utils'
import {
  ISwipeViews,
  SwipeableViewsContextType,
  IEventDetails,
} from './interfaces'
import {
  UNCERTAINTY_THRESHOLD,
  HYSTERESIS,
  SPRING_CONFIG,
  AXIS_TYPES,
} from '../react-swipe-views-utils/constant'

export const SwipeViewsContext = createContext<
  SwipeableViewsContextType | undefined
>(undefined)

export const SwipeViews: FC<ISwipeViews> = (props) => {
  const {
    action,
    animateHeight = false,
    animateTransitions = true,
    axis = AXIS_TYPES.X,
    children = [],
    containerStyle,
    disabled = false,
    disableLazyLoading = false,
    enableTouchEvents = true,
    enableMouseEvents = false,
    enableKeyEvents = false,
    hysteresis = HYSTERESIS,
    ignoreNativeScroll = false,
    index = 0,
    resistance = false,
    slideClassName,
    springConfig = SPRING_CONFIG,
    style,
    threshold = 5,
    autoPlay,
    slideCount,
    onScroll,
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onMouseMove,
    onChangeIndex,
    onSwitching,
    onTransitionEnd,
    ...other
  } = props

  const containerNode = useRef<HTMLDivElement>(null)
  const rootNode = useRef<HTMLDivElement>(null)
  const indexCurrent = useRef(index)
  const startX = useRef(0)
  const startY = useRef(0)
  const lastX = useRef(0)
  const isSwiping = useRef<boolean | undefined>(undefined)
  const started = useRef(false)
  const startIndex = useRef(0)
  const viewLength = useRef(0)
  const vx = useRef(0)
  const activeSlide = useRef<HTMLDivElement>(null)
  const ignoreNextScrollEvents = useRef(false)
  const scrollNode = useRef<HTMLElement | null>(null)
  const transitionListener = useRef<void | null>(null)
  const touchMoveListener = useRef<void | null>(null)
  const keyPressListener = useRef<void | null>(null)
  const indexLatestRef = useRef<number>(index)
  const timer = useRef<number | null>(null)

  const [indexLatest, setIndexLatest] = useState(index)
  const [isDragging, setIsDragging] = useState(false)
  const [renderOnlyActive, setRenderOnlyActive] = useState(!disableLazyLoading)
  const [heightLatest, setHeightLatest] = useState(0)
  const [displaySameSlide, setDisplaySameSlide] = useState(false)

  // Detect transition end
  useEffect(() => {
    if (!disableLazyLoading) setRenderOnlyActive(false)

    action?.({ updateHeight })

    const onTransitionEndFn = (event: TransitionEvent) => {
      if (event.target !== containerNode.current) return
      handleTransitionEnd()
    }

    const containerNodeEl = containerNode.current
    transitionListener.current = containerNodeEl?.addEventListener(
      'transitionend',
      onTransitionEndFn,
    )

    return () => {
      if (transitionListener.current)
        containerNodeEl?.removeEventListener('transitionend', onTransitionEndFn)
    }
  }, []) // eslint-disable-line

  // Handle touch events
  useEffect(() => {
    const onTouchMoveFn = (event: TouchEvent) => {
      if (disabled || !enableTouchEvents) return
      handleSwipeMove(standariseEvent(event))

      if (started.current) return
      handleTouchStart(event)
    }

    const rootNodeEl = rootNode.current
    touchMoveListener.current = rootNodeEl?.addEventListener(
      'touchmove',
      onTouchMoveFn,
      {
        passive: false,
      },
    )

    return () => {
      if (touchMoveListener.current)
        rootNodeEl?.removeEventListener('touchmove', onTouchMoveFn)
    }
  }, []) // eslint-disable-line

  // Handle key events
  useEffect(() => {
    const onKeyPressFn = (event: KeyboardEvent) => {
      if (disabled) return

      const action = getKeyAction({ axis, key: event.key })
      if (!action) return

      let indexNew =
        action === 'increase'
          ? indexLatestRef.current + 1
          : indexLatestRef.current - 1
      if (children)
        indexNew = mod(indexNew, getSlideCount({ slideCount, children }))

      // Is uncontrolled
      if (index === undefined) startIndex.current = indexNew

      setIndexLatest(indexNew)
      onChangeIndex?.(indexNew, indexLatestRef.current, { reason: event.key })
    }

    if (enableKeyEvents)
      keyPressListener.current = window?.addEventListener(
        'keydown',
        onKeyPressFn,
      )

    return () => {
      if (keyPressListener.current)
        window?.removeEventListener('keydown', onKeyPressFn)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (timer.current) clearInterval(timer.current)

    if (!autoPlay?.enabled) return
    timer.current = setInterval(
      handleInterval,
      autoPlay.interval,
    ) as unknown as number

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [index, autoPlay]) // eslint-disable-line

  const handleInterval = () => {
    if (!autoPlay?.enabled) return

    let indexNew = autoPlay.direction === 'inc' ? index + 1 : index - 1

    if (children)
      indexNew = mod(indexNew, getSlideCount({ slideCount, children }))

    // Is uncontrolled
    if (index === undefined) setIndexLatest(indexNew)

    onChangeIndex?.(indexNew, index, { reason: 'autoplay' })
  }

  useEffect(() => {
    indexLatestRef.current = indexLatest
  }, [indexLatest])

  const handleTransitionEnd = useCallback(() => {
    if (!onTransitionEnd || displaySameSlide || isDragging) return

    onTransitionEnd(indexCurrent.current)
  }, [onTransitionEnd, displaySameSlide, isDragging, indexCurrent])

  const updateHeight = () => {
    if (activeSlide.current === null) return

    const child = activeSlide.current?.children[0] as HTMLDivElement
    if (
      child !== undefined &&
      child.offsetHeight !== undefined &&
      heightLatest !== child.offsetHeight
    ) {
      setHeightLatest(child.offsetHeight)
    }
  }

  const setIndexCurrent = useCallback(
    (indexNew: number) => {
      if (!animateTransitions && indexCurrent.current !== indexNew) {
        handleTransitionEnd()
      }

      indexCurrent.current = indexNew

      if (!containerNode.current) return

      const transform = axisProperties.transform[axis](indexNew * 100)
      containerNode.current.style.transform = transform
    },
    [animateTransitions, axis, handleTransitionEnd],
  )

  useEffect(() => {
    setIndexCurrent(index)
    setIndexLatest(index)
  }, [index, setIndexCurrent])

  const getSwipeableViewsContext = () => {
    return {
      slideUpdateHeight: () => updateHeight(),
    }
  }

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement> | TouchEvent,
  ) => {
    onTouchStart?.(event)
    handleSwipeStart(standariseEvent(event))
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    onTouchEnd?.(event)
    handleSwipeEnd()
  }

  // Function that is triggered when user swiping starts
  const handleSwipeStart = (event: IEventDetails) => {
    if (!containerNode.current || !rootNode.current) return

    const touch = applyRotationalMatrix(event, axis)
    if (!touch) return

    const lengthType = axisProperties.length[axis] as 'width' | 'height'
    viewLength.current = rootNode.current?.getBoundingClientRect()[lengthType]
    startX.current = touch.pageX
    startY.current = touch.pageY
    lastX.current = touch.pageX
    vx.current = 0
    isSwiping.current = undefined
    started.current = true

    const newStartIndex = updateStartIndex({
      containerNode: containerNode.current,
      rootNode: rootNode.current,
      axis,
      viewLength: viewLength.current,
    })
    if (!newStartIndex) return

    startIndex.current = newStartIndex
  }

  // Function that is triggered when user swiping ends
  const handleSwipeEnd = () => {
    scrollNode.current = null
    if (!started || !indexCurrent) return

    started.current = false

    if (isSwiping.current !== true) return

    const indexMax = getSlideCount({ slideCount, children }) - 1

    const indexNew = calculateNewIndex({
      threshold,
      vx: vx.current,
      indexLatest,
      indexCurrent: indexCurrent.current,
      hysteresis,
      indexMax,
    })

    setIndexLatest(indexNew)
    setIsDragging(false)

    onSwitching?.(indexNew, 'end')

    if (indexNew !== indexLatest)
      onChangeIndex?.(indexNew, indexLatest, {
        reason: 'swipe',
      })

    if (indexCurrent.current === indexLatest) handleTransitionEnd()
  }

  const handleSwipeMove = (event: IEventDetails) => {
    if (!event?.target || !rootNode.current || !started.current) return

    if (scrollNode.current !== null && scrollNode.current !== rootNode.current)
      return

    const touch = applyRotationalMatrix(event, axis)
    if (!touch) return

    if (isSwiping.current === undefined) {
      const dx = Math.abs(touch.pageX - startX.current)
      const dy = Math.abs(touch.pageY - startY.current)

      const isSwipingNew = dx > dy && dx > UNCERTAINTY_THRESHOLD

      if (
        !resistance &&
        (axis === AXIS_TYPES.Y || axis === AXIS_TYPES.Y_REVERSE) &&
        ((indexCurrent.current === 0 && startX.current < touch.pageX) ||
          (indexCurrent.current ===
            getSlideCount({ slideCount, children }) - 1 &&
            startX.current > touch.pageX))
      ) {
        isSwiping.current = false
        return
      }

      if (dx > dy) event?.currentEvent?.preventDefault()

      if (isSwipingNew === true || dy > UNCERTAINTY_THRESHOLD) {
        isSwiping.current = isSwipingNew
        startX.current = touch.pageX
        return
      }
    }

    if (isSwiping.current !== true) return

    event?.currentEvent?.preventDefault()

    vx.current = vx.current * 0.5 + (touch.pageX - lastX.current) * 0.5
    lastX.current = touch.pageX

    // Add support for native scroll elements.
    if (scrollNode.current === null && !ignoreNativeScroll) {
      const domTreeShapes = getDomTreeShapes(event.target, rootNode.current)
      const nativeHandler = findNativeHandler({
        domTreeShapes,
        startX: startX.current,
        pageX: touch.pageX,
        axis,
      })

      if (nativeHandler) {
        scrollNode.current = nativeHandler
        return
      }
    }

    const { indexNew, newStartX } = computeIndex({
      children,
      startIndex: indexLatestRef.current,
      pageX: touch.pageX,
      startX: startX.current,
      viewLength: viewLength.current,
      resistance,
    })

    if (newStartX) {
      startX.current = newStartX
    } else if (scrollNode.current === null) {
      scrollNode.current = rootNode.current
    }

    setIndexCurrent(indexNew)
    onSwitching?.(indexNew, 'move')

    if (!displaySameSlide && isDragging) return

    setDisplaySameSlide(false)
    setIsDragging(true)
  }

  const handleScroll = (
    event: React.UIEvent<HTMLDivElement, globalThis.UIEvent>,
  ) => {
    const target = event.currentTarget
    if (!target) return

    onScroll?.(event)

    if (event.target !== rootNode.current) return

    if (ignoreNextScrollEvents.current) {
      ignoreNextScrollEvents.current = false
      return
    }

    const indexNew =
      Math.ceil(target.scrollLeft / target.clientWidth) + indexLatest

    ignoreNextScrollEvents.current = true
    target.scrollLeft = 0

    if (onChangeIndex && indexNew !== indexLatest) {
      onChangeIndex(indexNew, indexLatest, {
        reason: 'focus',
      })
    }
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onMouseDown?.(event)
    event.persist()

    handleSwipeStart(standariseEvent(event))
  }

  const handleMouseOut = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.nativeEvent.type === 'mouseout') {
      onMouseLeave?.(event)
      if (started.current) handleSwipeEnd()
      return
    }

    if (event.nativeEvent.type === 'mouseup') {
      onMouseUp?.(event)
      handleSwipeEnd()
    }
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onMouseMove?.(event)
    if (!started.current) return

    handleSwipeMove(standariseEvent(event))
  }

  const touchEvents =
    !disabled && enableTouchEvents
      ? {
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
        }
      : {}

  const mouseEvents =
    !disabled && enableMouseEvents
      ? {
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseOut,
          onMouseLeave: handleMouseOut,
        }
      : {}

  const containerStyleAdj = calculateTransitions({
    isDragging,
    animateTransitions,
    displaySameSlide,
    springConfig,
    heightLatest,
    axis,
    renderOnlyActive,
    indexCurrent: indexCurrent.current,
  })

  if (animateHeight) containerStyleAdj.height = heightLatest

  const slideStyle = { ...styles.slide, ...props.slideStyle }

  const containerNodeStyles = {
    ...containerStyleAdj,
    ...styles.container,
    ...containerStyle,
  } as unknown as CSSProperties

  return (
    <SwipeViewsContext.Provider value={getSwipeableViewsContext()}>
      <div
        ref={rootNode}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...other}
        {...touchEvents}
        {...mouseEvents}
        onScroll={handleScroll}
      >
        <div ref={containerNode} style={containerNodeStyles}>
          {Children.map(children, (child, indexChild) => {
            if (renderOnlyActive && indexChild !== indexLatest) return null

            let ref
            let hidden = true

            if (indexChild === indexLatest) {
              hidden = false

              if (animateHeight) {
                ref = activeSlide
                updateHeight()
                slideStyle.overflowY = 'hidden'
              }
            }

            return (
              <div
                ref={ref}
                style={slideStyle}
                className={slideClassName}
                aria-hidden={hidden}
                data-swipeable="true"
              >
                {child}
              </div>
            )
          })}
        </div>
      </div>
    </SwipeViewsContext.Provider>
  )
}
