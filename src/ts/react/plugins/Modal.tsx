/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { modalActions } from "../../store/actions/plugins/modalActions"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction } from "../../types"

interface ModalProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDialogElement> {
  idState: ID
  isLoad: boolean
  closeOnOverlay?: boolean
}

const customModalProperties: Array<keyof ModalProperties> = ["idState", "isLoad", "closeOnOverlay"]

const Modal : React.FC<ModalProperties> = props => {
  const actions = modalActions(useAppDispatch())
  const result = useAppSelector(state => state.modals[state.modals.findIndex(spoiler => spoiler.id === props.idState)])
  const overlay = useRef<HTMLDivElement>(null)

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })
  }, [])

  const closeOnOverlayHandler: React.MouseEventHandler = event => {
    (
      props?.closeOnOverlay &&
      overlay.current &&
      (event.target as HTMLElement).contains(overlay.current)
    ) && actions.close(result.id)
  }

  return (
    <dialog {...Methods.filterObject(props, customModalProperties)} className={`modal ${result?.open ? "open" : ""} ${props?.className || ""}`.trim()} open>
      <div ref={overlay} onClick={e => closeOnOverlayHandler(e)} className="modal-overlay">
        <div className="modal-window">{props?.children || null}</div>
      </div>
    </dialog>
  )
}

interface ModalTargetProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  onTarget?: AnyFunction
}

const customModalTargetProperties: Array<keyof ModalTargetProperties> = ["idState", "onTarget"]

export const ModalTarget: React.FC<ModalTargetProperties> = props => {
  const actions = modalActions(useAppDispatch())
  const result = useAppSelector(state => state.modals[state.modals.findIndex(spoiler => spoiler.id === props.idState)])

  useEffect(() => {
    result !== undefined && actions.load(result)
  }, [])

  function clickHandler() {
    result.open
      ? actions.close(result.id)
      : actions.open(result.id)
    props.onTarget && props.onTarget()
  }

  return <div {...Methods.filterObject(props, customModalTargetProperties)} className={`modal-target ${props?.className || ""}`.trim()} onClick={Methods.concatFunctions(clickHandler, props?.onClick || null)}>{props?.children || null}</div>
}
export default Modal