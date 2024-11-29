import React from 'react'
import { IEventDetails } from '../react-swipe-views/interfaces'

function instanceOfMouseEvent(
  object: any, // eslint-disable-line
): object is React.MouseEvent<HTMLDivElement, MouseEvent> {
  return 'pageX' in object
}

function instanceOfTouchDivEvent(
  object: any, // eslint-disable-line
): object is React.TouchEvent<HTMLDivElement> {
  return 'touches' in object
}

function instanceOfTouchEvent(
  object: any, // eslint-disable-line
): object is TouchEvent {
  return 'touches' in object
}

export const standariseEvent = (
  event:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.TouchEvent<HTMLDivElement>
    | TouchEvent,
): IEventDetails => {
  if (instanceOfMouseEvent(event)) {
    return {
      pageX: event.pageX,
      pageY: event.pageY,
      scrollLeft: event.currentTarget.scrollLeft,
      clientWidth: event.currentTarget.clientWidth,
      target: event.currentTarget,
      currentEvent: event,
    }
  }

  if (instanceOfTouchDivEvent(event)) {
    return {
      pageX: event.touches[0].pageX,
      pageY: event.touches[0].pageY,
      scrollLeft: event.currentTarget.scrollLeft,
      clientWidth: event.currentTarget.clientWidth,
      target: event.currentTarget,
      currentEvent: event,
    }
  }

  if (instanceOfTouchEvent(event)) {
    return {
      pageX: event.touches[0].pageX,
      pageY: event.touches[0].pageY,
      currentEvent: event,
    }
  }

  return {
    pageX: 0,
    pageY: 0,
    currentEvent: event,
  }
}
