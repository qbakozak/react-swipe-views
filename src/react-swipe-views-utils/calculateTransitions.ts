import { axisProperties, axisType } from './axisProperties'
import { NO_ANIMATE_TRANSITION } from './constant'

export interface ITransitionOptions {
  duration: string
  easeFunction: string
  delay: string
}

export const createTransition = (
  property: string,
  options: ITransitionOptions,
) => {
  const { duration, easeFunction, delay } = options

  return `${property} ${duration} ${easeFunction} ${delay}`
}

export interface ICalculateTransitionsProps {
  isDragging: boolean
  animateTransitions: boolean
  displaySameSlide: boolean
  springConfig: ITransitionOptions
  heightLatest: number
  axis: axisType
  renderOnlyActive: boolean
  indexCurrent: number
}

export const calculateTransitions = (props: ICalculateTransitionsProps) => {
  const {
    isDragging,
    animateTransitions,
    displaySameSlide,
    springConfig,
    heightLatest,
    axis,
    renderOnlyActive,
    indexCurrent,
  } = props

  let transition
  let WebkitTransition

  if (isDragging || !animateTransitions || displaySameSlide) {
    transition = NO_ANIMATE_TRANSITION
    WebkitTransition = NO_ANIMATE_TRANSITION
  } else {
    transition = createTransition('transform', springConfig)
    WebkitTransition = createTransition('-webkit-transform', springConfig)

    if (heightLatest !== 0) {
      const additionalTranstion = `, ${createTransition('height', springConfig)}`
      transition += additionalTranstion
      WebkitTransition += additionalTranstion
    }
  }

  const style = {
    height: undefined,
    WebkitFlexDirection: axisProperties.flexDirection[axis],
    flexDirection: axisProperties.flexDirection[axis],
    WebkitTransition,
    transition,
  } as React.CSSProperties

  if (!renderOnlyActive) {
    const transform = axisProperties.transform[axis](indexCurrent * 100)
    style.WebkitTransform = transform
    style.transform = transform
  }

  return style
}
