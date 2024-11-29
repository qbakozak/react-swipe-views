import { axisType } from './axisProperties'

export const RESISTANCE_COEF = 0.6
export const UNCERTAINTY_THRESHOLD = 6
export const HYSTERESIS = 0.6
export const SPRING_CONFIG = {
  duration: '1s',
  easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
  delay: '0s',
}
export const NO_ANIMATE_TRANSITION = 'all 0s ease 0s'

export const ACTION = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
}

export const AXIS_TYPES = {
  X: 'x' as axisType,
  Y: 'y' as axisType,
  X_REVERSE: 'x-reverse' as axisType,
  Y_REVERSE: 'y-reverse' as axisType,
}
