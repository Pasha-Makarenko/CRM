/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
export interface AnyObject {
  [key: string | number | symbol]: any
}
export type AnyFunction = (...args: Array<any>) => any