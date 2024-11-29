import { axisProperties, axisType } from './axisProperties'
import { IShapeType, IShape } from '../react-swipe-views/interfaces'
import { AXIS_TYPES } from './constant'

export interface IFindNativeHandler {
  domTreeShapes: IShape[]
  pageX: number
  startX: number
  axis: axisType
}

export const findNativeHandler = (params: IFindNativeHandler) => {
  const { domTreeShapes, pageX, startX, axis } = params

  let element: IShape | undefined

  domTreeShapes.some((shape: IShape) => {
    let goingForward = pageX >= startX
    if (axis === AXIS_TYPES.X || axis === AXIS_TYPES.Y)
      goingForward = !goingForward

    const sPos = axisProperties.scrollPosition[axis] as keyof IShapeType
    const scrollPosition = Math.round(shape[sPos])

    const areNotAtStart = scrollPosition > 0

    const cLg = axisProperties.clientLength[axis] as keyof IShapeType
    const sLg = axisProperties.scrollLength[axis] as keyof IShapeType
    const areNotAtEnd = scrollPosition + shape[cLg] < shape[sLg]

    if ((goingForward && areNotAtEnd) || (!goingForward && areNotAtStart)) {
      element = shape
      return true
    }

    return false
  })

  return element?.element
}
