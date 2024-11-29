import { Children } from 'react'

export const getSlideCount = (props: {
  slideCount?: number
  children: JSX.Element[]
}) => {
  return props.slideCount || Children.count(props.children)
}
