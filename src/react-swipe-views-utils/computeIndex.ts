import { Children } from 'react'
import { RESISTANCE_COEF } from './constant'

export interface IComputeIndexProps {
  startIndex: number
  startX: number
  pageX: number
  viewLength: number
  resistance: boolean
  children: JSX.Element[]
}

export const computeIndex = (props: IComputeIndexProps) => {
  const { children, startIndex, pageX, startX, viewLength, resistance } = props

  const indexMax = Children.count(children) - 1
  let indexNew = startIndex + (startX - pageX) / viewLength
  let newStartX

  if (!resistance) {
    if (indexNew < 0) {
      indexNew = 0
      newStartX = (indexNew - startIndex) * viewLength + pageX
    } else if (indexNew > indexMax) {
      indexNew = indexMax
      newStartX = (indexNew - startIndex) * viewLength + pageX
    }
  } else if (indexNew < 0) {
    indexNew = Math.exp(indexNew * RESISTANCE_COEF) - 1
  } else if (indexNew > indexMax) {
    indexNew = indexMax + 1 - Math.exp((indexMax - indexNew) * RESISTANCE_COEF)
  }

  return {
    indexNew,
    newStartX,
  }
}
