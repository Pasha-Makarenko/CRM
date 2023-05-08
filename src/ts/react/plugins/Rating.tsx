/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { ratingActions } from "../../store/actions/plugins/ratingActions"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction } from "../../types"

interface RatingProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  starCount: number
  canChange: boolean
  onGrade?: AnyFunction
  isLoad: boolean
}

const customRatingProperties: Array<keyof RatingProperties> = ["idState", "starCount", "canChange", "onGrade", "isLoad"]

const Rating: React.FC<RatingProperties> = props => {
  if (props.starCount <= 0) return <React.Fragment/>

  const actions = ratingActions(useAppDispatch())
  const result = useAppSelector(state => state.ratings[state.ratings.findIndex(spoiler => spoiler.id === props.idState)])
  const children : Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })
  }, [])

  function gradeHandler(id: number): void {
    if (!props.canChange && result.graded !== -1) return
    actions.grade({...result, graded: id})
    props.onGrade && props.onGrade()
  }

  return (
    <div {...Methods.filterObject(props, customRatingProperties)} className={`rating ${!props.canChange && result?.graded !== -1 ? "locked" : ""} ${props?.className || ""}`.trim()}>
      {children
        ? new Array(props.starCount).fill("").map((_, i) => children
          .filter(el => (i <= result?.graded && el.type === RatingStarFilled) || (i > result?.graded && el.type === RatingStarEmpty))
          .map(el => <button
            {...el.props}
            className={`rating-star ${el.props?.className || ""}`.trim()}
            key={i}
            onClick={Methods.concatFunctions(() => gradeHandler(i), el.props?.onClick || null)}
          >{el.props?.children || null}</button>))
        : null}
    </div>
  )
}

type RatingStarProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLButtonElement>
export const RatingStarFilled : React.FC<RatingStarProperties> = _props => <React.Fragment/>
export const RatingStarEmpty : React.FC<RatingStarProperties> = _props => <React.Fragment/>

export default Rating