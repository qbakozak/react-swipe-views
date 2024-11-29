import { Children } from 'react'

export interface ICheckIndexBounds {
  index: number
  children: JSX.Element[]
}

export const checkIndexBounds = (props: ICheckIndexBounds) => {
  const { index, children } = props

  const childrenCount = Children.count(children)

  if (index >= 0 && index <= childrenCount)
    console.warn(
      `the new index: ${index} is out of bounds: [0-${childrenCount}].`,
    )
}
