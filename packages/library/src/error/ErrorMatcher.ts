import { CustomError } from './CustomError'

export const notError =
  <F extends CustomError | Error>(f: new (...args: Array<never>) => F) =>
  <T>(m: T | F): m is Exclude<T, F> =>
    !(m instanceof f)

export const isError =
  <F extends CustomError | Error, T>(f: new (...args: Array<never>) => F) =>
  (m: T | F): m is F =>
    m instanceof f
