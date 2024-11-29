import { axisType } from './axisProperties'
import { AXIS_TYPES, ACTION } from './constant'

export interface IGetKeyAction {
  axis: axisType
  key: string
}

export const getKeyAction = (props: IGetKeyAction) => {
  const { axis, key } = props
  let action

  switch (key) {
    case 'ArrowDown':
    case 'down':
      if (axis === AXIS_TYPES.Y) {
        action = ACTION.INCREASE
      } else if (axis === AXIS_TYPES.Y_REVERSE) {
        action = ACTION.DECREASE
      }
      break

    case 'ArrowLeft':
      if (axis === AXIS_TYPES.X) {
        action = ACTION.DECREASE
      } else if (axis === AXIS_TYPES.Y_REVERSE) {
        action = ACTION.INCREASE
      }
      break

    case 'ArrowUp':
    case 'up':
      if (axis === AXIS_TYPES.Y) {
        action = ACTION.DECREASE
      } else if (axis === AXIS_TYPES.Y_REVERSE) {
        action = ACTION.INCREASE
      }
      break

    case 'ArrowRight':
      if (axis === AXIS_TYPES.X) {
        action = ACTION.INCREASE
      } else if (axis === AXIS_TYPES.Y_REVERSE) {
        action = ACTION.DECREASE
      }
      break

    default:
      break
  }

  return action
}
