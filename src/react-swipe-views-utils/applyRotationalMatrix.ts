import { IEventDetails } from '../react-swipe-views/interfaces'
import { axisProperties, axisType } from './axisProperties'

export const applyRotationalMatrix = (
  eventDetails: IEventDetails,
  axis: axisType,
) => {
  const rotationMatrix = axisProperties.rotationMatrix[axis]

  return {
    pageX:
      rotationMatrix.x[0] * eventDetails.pageX +
      rotationMatrix.x[1] * eventDetails.pageY,
    pageY:
      rotationMatrix.y[0] * eventDetails.pageX +
      rotationMatrix.y[1] * eventDetails.pageY,
  }
}
