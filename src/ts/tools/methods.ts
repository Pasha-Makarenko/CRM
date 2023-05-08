/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFunction, AnyObject } from "../types"

export class Methods {
  static filterObject(object: AnyObject, filters: Array<string | number | symbol>): AnyObject {
    const filteredObject: AnyObject = {}

    Object.entries(object).forEach(el => {
      if (!filters.find(filter => filter === el[0])) filteredObject[el[0]] = el[1]
    })

    return filteredObject
  }

  static concatFunctions(...functions: Array<AnyFunction | null>) {
    return () => {
      for (let i = 0; i < functions.length; i++) functions[i] && functions[i]!()
    }
  }
}