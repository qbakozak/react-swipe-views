export const addEventListener = (
  node: HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions,
) => {
  node.addEventListener(event, handler, options)

  return {
    remove() {
      node.removeEventListener(event, handler, options)
    },
  }
}
