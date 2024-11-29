import { Children } from 'react'

export interface IGetDisplaySameSlide {
  index: number
  children: JSX.Element[]
}

const getChildrenKey = (child: JSX.Element) => (child ? child.key : 'empty')

export const getDisplaySameSlide = (
  props: IGetDisplaySameSlide,
  nextProps: IGetDisplaySameSlide,
) => {
  if (!props.children.length || !nextProps.children.length) return false

  let displaySameSlide = false

  const oldKeys = Children.map(props.children, getChildrenKey)
  const oldKey = oldKeys[props.index]

  if (oldKey !== null && oldKey !== undefined) {
    const newKeys = Children.map(nextProps.children, getChildrenKey)
    const newKey = newKeys[nextProps.index]

    if (oldKey === newKey) {
      displaySameSlide = true
    }
  }

  return displaySameSlide
}
