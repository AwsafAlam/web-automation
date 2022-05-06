const isBangladeshiPhone = (phone: string): boolean => {
  // validate the phone number
  // do it according to your country

  /*
        The number may start with +8801 or 8801 or 01
        The next number can be either 3,4,5,6,7,8,9
        Then there have exact 8 digit.
    */

  const pat = /^(?:\+?88)?01[3-9]\d{8}$/
  // const m = phone.match(pat);
  const m = pat.exec(phone)
  if (m !== null) return true

  return false
}

const isEmpty = (value: string | number | Record<string, unknown>): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' &&
    Object.keys(value).filter((key) => value[key] !== '').length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const isString = (value: string): boolean =>
  value !== undefined && typeof value === 'string'

const isNumber = (value: number): boolean =>
  value !== undefined && !isNaN(value)

const isBoolean = (value: boolean): boolean => typeof value === typeof true

const isStringAndNotEmpty = (value: string): boolean =>
  value !== undefined && typeof value === 'string' && value.trim().length !== 0

const isObject = (value: unknown): boolean =>
  value !== undefined && typeof value === 'object'

const isObjectAndNotEmpty = (value: Record<string, unknown>): boolean =>
  value !== undefined &&
  typeof value === 'object' &&
  Object.keys(value).length !== 0

const isArray = (value: Array<string | number | undefined>): boolean =>
  value !== undefined && Array.isArray(value)

const isArrayAndNotEmpty = (value: Array<string | number>): boolean =>
  value !== undefined && Array.isArray(value) && value.length !== 0

const isDate = (value: string): boolean =>
  value !== undefined && !isNaN(Date.parse(value))

export default {
  isEmpty,
  isNumber,
  isBoolean,
  isString,
  isStringAndNotEmpty,
  isObject,
  isObjectAndNotEmpty,
  isArray,
  isArrayAndNotEmpty,
  isDate,
  isBangladeshiPhone,
}
