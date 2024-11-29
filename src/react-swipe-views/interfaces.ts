import { CSSProperties } from 'react'
import { axisType } from '../react-swipe-views-utils/axisProperties'
import { ITransitionOptions } from '../react-swipe-views-utils/calculateTransitions'

export interface IEventDetails {
  pageX: number
  pageY: number
  scrollLeft?: number
  clientWidth?: number
  target?: HTMLElement
  currentEvent?:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.TouchEvent<HTMLDivElement>
    | TouchEvent
}

export interface IShapeType {
  scrollWidth: number
  scrollHeight: number
  clientWidth: number
  clientHeight: number
  scrollLeft: number
  scrollTop: number
}

export interface IShape extends IShapeType {
  element: HTMLElement
}

export interface SwipeableViewsContextType {
  slideUpdateHeight: () => void
}

export interface IOnChangeMeta {
  reason: string
}

export interface IAutoPlay {
  /**
   * If `false`, the auto play behavior is disabled.
   */
  enabled: boolean

  /**
   * This is the auto play direction.
   */
  direction: 'inc' | 'dec'

  /**
   * Delay between auto play transitions (in ms).
   */
  interval: number
}

export interface ISwipeViews {
  /**
   * If `true`, the height of the container will be animated to match the current slide height.
   * Animating another style property has a negative impact regarding performance.
   * @default false
   */
  animateHeight?: boolean

  /**
   * If `false`, changes to the index prop will not cause an animated transition.
   * @default true
   */
  animateTransitions?: boolean

  /**
   * The axis on which the slides will slide.
   * @default 'x'
   */
  axis?: axisType

  /**
   * Use this property to provide your slides.
   */
  children?: JSX.Element[]

  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */

  containerStyle?: CSSProperties

  /**
   * If `true`, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   * @default false
   */
  disabled?: boolean

  /**
   * This is the config used to disable lazyloding,
   * if `true` will render all the views in first rendering.
   * @default false
   */
  disableLazyLoading?: boolean

  /**
   * If `true`, it will enable touch events.
   * This will allow the user to perform the relevant swipe actions with a touch.
   * @default false
   */
  enableTouchEvents?: boolean

  /**
   * If `true`, it will enable mouse events.
   * This will allow the user to perform the relevant swipe actions with a mouse.
   * @default false
   */
  enableMouseEvents?: boolean

  /**
   * If `true`, it will enable key events.
   * This will allow the user to perform the relevant swipe actions with a keys.
   * @default false
   */
  enableKeyEvents?: boolean

  /**
   * Configure hysteresis between slides. This value determines how far
   * should user swipe to switch slide.
   * @default 0.6
   */
  hysteresis?: number

  /**
   * If `true`, it will ignore native scroll container.
   * It can be used to filter out false positive that blocks the swipe.
   * @default false
   */
  ignoreNativeScroll?: boolean

  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   * @default 0
   */
  index: number

  /**
   * If `true`, it will add bounds effect on the edges.
   * @default false
   */
  resistance?: boolean

  /**
   * This is the className that will be applied
   * on the slide component.
   */
  slideClassName?: string

  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle?: CSSProperties

  /**
   * This is the config used to create CSS transitions.
   * This is useful to change the dynamic of the transition.
   */
  springConfig?: ITransitionOptions

  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style?: CSSProperties

  /**
   * This is the threshold used for detecting a quick swipe.
   * If the computed speed is above this value, the index change.
   * @default 5
   */
  threshold?: number

  /**
   * Enable and disable autoplay.
   *
   * @param {boolean} enabled is autoplay enabled
   * @param {'inc' | 'dec'} direction Direction of the autoplay
   * @param {interval} time between switching the slides
   */
  autoPlay?: IAutoPlay

  /**
   * When set, it's adding a limit to the number of slide: [0, slideCount].
   */
  slideCount?: number

  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updateHeight() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action?: (actions: { updateHeight?: () => void }) => void

  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {integer} indexLatest This is the oldest index of the slide.
   * @param {object} meta Meta data containing more information about the event.
   */
  onChangeIndex?: (
    index: number,
    indexLatest: number,
    meta: IOnChangeMeta,
  ) => void

  /**
   * This is a callback prop. It is called by the component on mouse down event.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  /**
   * This is a callback prop. It is called by the component on mouse leave event.
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  /**
   * This is a callback prop. It is called by the component on mouse move event.
   */
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  /**
   * This is a callback prop. It is called by the component on mouse up event.
   */
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  /**
   * This is a callback prop. It is called by the component on scroll event.
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) => void

  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding
   * to the current slide position.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {string} type Can be either `move` or `end`.
   */
  onSwitching?: (index: number, type: 'move' | 'end' | 'autoplay') => void

  /**
   * This is a callback prop. It is called by the component on touch end event.
   */
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void

  /**
   * This is a callback prop. It is called by the component on touch move event.
   */
  onTouchMove?: (event: React.TouchEvent<HTMLDivElement>) => void

  /**
   * This is a callback prop. It is called by the component on touch start event.
   */
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement> | TouchEvent) => void

  /**
   * The callback that fires when the animation comes to a rest.
   * This is useful to defer CPU intensive task.
   */
  onTransitionEnd?: (indexLatest: number) => void
}

export interface ISwipeViewsVirtual extends ISwipeViews {
  /**
   * Number of slide to render after the visible slide.
   * @default 3
   */
  overscanSlideAfter?: number

  /**
   * Number of slide to render before the visible slide.
   * * @default 2
   */
  overscanSlideBefore?: number

  /**
   * When set, it's adding a limit to the number of slide: [0, slideCount].
   */
  slideCount: number

  /**
   * Responsible for rendering a slide given an index.
   * ({ index: number }): node.
   */
  slideRenderer: (props: { index: number; key: number }) => JSX.Element
}
