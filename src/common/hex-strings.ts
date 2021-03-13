/* Imports: External */
import { BigNumber } from 'ethers'

/**
 * Removes "0x" from start of a string if it exists.
 * @param str String to modify.
 * @returns the string without "0x".
 */
export const remove0x = (str: string): string => {
  // TODO: Figure out why we needed this, if at all?
  if (str === undefined) {
    return str
  }

  return str.startsWith('0x') ? str.slice(2) : str
}

/**
 * Adds "0x" to the start of a string if necessary.
 * @param str String to modify.
 * @returns the string with "0x".
 */
export const add0x = (str: string): string => {
  if (str === undefined) {
    return str
  }
  return str.startsWith('0x') ? str : '0x' + str
}

/**
 * Returns whether or not the provided string is a hex string.
 * @param str The string to test.
 * @returns True if the provided string is a hex string, false otherwise.
 */
export const isHexString = (inp: any): boolean => {
  return typeof inp === 'string' && inp.startsWith('0x')
}

/**
 * Casts a hex string to a buffer.
 * @param inp Input to cast to a buffer.
 * @return Input cast as a buffer.
 */
export const fromHexString = (inp: Buffer | string): Buffer => {
  if (typeof inp === 'string') {
    if (inp.startsWith('0x')) {
      return Buffer.from(inp.slice(2), 'hex')
    } else {
      return Buffer.from(inp, 'hex')
    }
  }

  return Buffer.from(inp)
}

/**
 * Casts an input to a hex string.
 * @param inp Input to cast to a hex string.
 * @return Input cast as a hex string.
 */
export const toHexString = (
  inp: Buffer | string | BigNumber | number | null
): string => {
  if (typeof inp === 'number' || BigNumber.isBigNumber(inp)) {
    return BigNumber.from(inp).toHexString()
  } else {
    return '0x' + fromHexString(inp).toString('hex')
  }
}

/**
 * Casts an input to a hex string where all leading zeros are removed.
 * If the value of the input is zero, then the string will be 0x0.
 * @param inp Input to cast.
 * @return Input cast as a hex string with no leading zeros.
 */
export const toRpcHexString = (
  inp: Buffer | string | number | null
): string => {
  return '0x' + toHexString(inp).slice(2).replace(/^0+/, '') || '0'
}

/**
 * Pads the start of a hex string with a given number of zero bytes.
 * @param str Hex string to pad.
 * @param length Number of zero bytes to add to the string.
 * @return Hex string with more zero bytes than before (woot).
 */
export const padHexString = (str: string, length: number): string => {
  if (str.length === 2 + length * 2) {
    return str
  } else {
    return '0x' + str.slice(2).padStart(length * 2, '0')
  }
}

// TODO: Review these three functions, see if we can simplify and use other functions instead.
export const toVerifiedBytes = (val: string, len: number): string => {
  val = remove0x(val)

  if (val.length !== len) {
    throw new Error('Invalid length!')
  }

  return val
}
export const getByteLength = (pos: { start: number; end: number }): number => {
  return (pos.end - pos.start) * 2
}
export const encodeHex = (val: any, len: number): string => {
  return remove0x(BigNumber.from(val).toHexString()).padStart(len, '0')
}
