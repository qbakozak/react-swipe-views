import { axisType } from './axisProperties'
import { applyRotationalMatrix } from './applyRotationalMatrix'

export interface IUpdateStartIndex {
  containerNode: HTMLDivElement
  rootNode: HTMLDivElement
  axis: axisType
  viewLength: number
}

export const updateStartIndex = (props: IUpdateStartIndex) => {
  const { containerNode, rootNode, axis, viewLength } = props

  const computedStyle = window.getComputedStyle(containerNode)
  const transform =
    computedStyle.getPropertyValue('-webkit-transform') ||
    computedStyle.getPropertyValue('transform')

  if (!transform || transform === 'none') return null

  const transformValues = transform.split('(')[1].split(')')[0].split(',')
  const rootStyle = window.getComputedStyle(rootNode)

  const tranformNormalized = applyRotationalMatrix(
    {
      pageX: parseInt(transformValues[4], 10),
      pageY: parseInt(transformValues[5], 10),
    },
    axis,
  )

  if (!tranformNormalized) return null

  const startIndex =
    -tranformNormalized.pageX /
      (viewLength -
        parseInt(rootStyle.paddingLeft, 10) -
        parseInt(rootStyle.paddingRight, 10)) || 0

  return startIndex
}
