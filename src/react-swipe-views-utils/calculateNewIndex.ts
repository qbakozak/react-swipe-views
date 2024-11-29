export interface ICalculateNewIndex {
  threshold: number
  vx: number
  indexLatest: number
  indexCurrent: number
  hysteresis: number
  indexMax: number
}

export const calculateNewIndex = (props: ICalculateNewIndex) => {
  const { threshold, vx, indexLatest, indexCurrent, hysteresis, indexMax } =
    props

  const delta = indexLatest - indexCurrent

  let indexNew
  if (Math.abs(vx) > threshold) {
    if (vx > 0) {
      indexNew = Math.floor(indexCurrent)
    } else {
      indexNew = Math.ceil(indexCurrent)
    }
  } else if (Math.abs(delta) > hysteresis) {
    indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent)
  } else {
    indexNew = indexLatest
  }

  if (indexNew < 0) {
    indexNew = 0
  } else if (indexNew > indexMax) {
    indexNew = indexMax
  }

  return indexNew
}
