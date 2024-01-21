/* eslint-disable max-classes-per-file */
import { CustomError } from './CustomError'
import { isError, notError } from './ErrorMatcher'

describe('ErrorMatcher', () => {
  describe('#isError', () => {
    it('returns true if the value is an instance of the error', () => {
      class ExtendedCustomError extends CustomError {}

      expect(isError(Error)(new Error())).toBe(true)
      expect(isError(CustomError)(new CustomError('some-error'))).toBe(true)
      expect(isError(ExtendedCustomError)(new ExtendedCustomError('some-error'))).toBe(
        true,
      )
    })

    it('returns false if the value is not an instance of the error', () => {
      class SomeClass {}

      expect(isError(Error)('some error')).toBe(false)
      expect(isError(Error)(1)).toBe(false)
      expect(isError(Error)(false)).toBe(false)
      expect(isError(Error)(undefined)).toBe(false)
      expect(isError(Error)(SomeClass)).toBe(false)
    })
  })

  describe('#notError', () => {
    it('returns false if the value is an instance of the error', () => {
      class ExtendedCustomError extends CustomError {}

      expect(notError(Error)(new Error())).toBe(false)
      expect(notError(CustomError)(new CustomError('some-error'))).toBe(false)
      expect(notError(ExtendedCustomError)(new ExtendedCustomError('some-error'))).toBe(
        false,
      )
    })

    it('returns true if the value is not an instance of the error', () => {
      class SomeClass {}

      expect(notError(Error)('some error')).toBe(true)
      expect(notError(Error)(1)).toBe(true)
      expect(notError(Error)(true)).toBe(true)
      expect(notError(Error)(undefined)).toBe(true)
      expect(notError(Error)(SomeClass)).toBe(true)
    })
  })
})
