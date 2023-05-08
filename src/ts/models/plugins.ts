/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { PayloadAction } from "@reduxjs/toolkit"

export interface PluginState {
  id: ID
  load: boolean
  [key: string | number | symbol]: any
}
export type ID = number | string
export type IdAction = PayloadAction<ID>
export interface AddProps {
  id: ID
  load: boolean
}
export type AddAction = PayloadAction<AddProps>

export interface Actions<State extends PluginState, AddArg = AddProps> {
  load(state: State): void
  add(props: AddArg): void
  delete(id: ID): void
}

export interface SpoilerState extends PluginState {
  open: boolean
}

export interface SpoilerActions extends Actions<SpoilerState> {
  open(id: ID): void
  close(id: ID): void
}

export interface TabsState extends PluginState {
  tab: number
}

export interface TabsActions extends Actions<TabsState> {
  tab(state: TabsState): void
}

export interface SelectState extends PluginState {
  open?: boolean
  selected?: {
    id: number
    value: number | string | null
  }
}

export interface SelectActions extends Actions<SelectState> {
  open(id: ID): void
  close(id: ID): void
  select(state: SelectState): void
}

export interface ShowMoreState extends PluginState {
  open: boolean
}

export interface ShowMoreActions extends Actions<ShowMoreState> {
  open(id: ID): void
  close(id: ID): void
}

export interface RatingState extends PluginState {
  graded: number
}

export interface RatingActions extends Actions<RatingState> {
  grade(state: RatingState): void
}

export interface ModalState extends PluginState {
  open: boolean
}

export interface ModalActions extends Actions<ModalState> {
  open(id: ID): void
  close(id: ID): void
}

export interface CounterState extends PluginState {
  value: number
  change: {
    sub: number
    add: number
  }
  limit: {
    min: number
    max: number
  }
}

export interface CounterActions extends Actions<CounterState, CounterState> {
  addValue(id: ID): void
  subValue(id: ID): void
  setValue(value: {id: ID, value: number}): void
}

export interface BurgerState extends PluginState {
  open: boolean
}

export interface BurgerActions extends Actions<BurgerState> {
  open(id: ID): void
  close(id: ID): void
}