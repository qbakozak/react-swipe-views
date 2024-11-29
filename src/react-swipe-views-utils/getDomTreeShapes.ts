export const getDomTreeShapes = (
  element: HTMLElement,
  rootNode: HTMLElement,
) => {
  let domTreeShapes: any[] = [] // eslint-disable-line

  while (element && element !== rootNode && element !== document.body) {
    if (element.hasAttribute('data-swipeable')) break

    const style = window.getComputedStyle(element)

    if (
      style.getPropertyValue('position') === 'absolute' ||
      style.getPropertyValue('overflow-x') === 'hidden'
    ) {
      domTreeShapes = []
    } else if (
      (element.clientWidth > 0 && element.scrollWidth > element.clientWidth) ||
      (element.clientHeight > 0 && element.scrollHeight > element.clientHeight)
    ) {
      domTreeShapes.push({
        element,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
      })
    }

    element = element.parentNode as unknown as HTMLElement
  }

  return domTreeShapes
}
