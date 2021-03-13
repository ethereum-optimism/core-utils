import { expect } from '../setup'

import { add0x, remove0x, isHexString, toHexString } from '../../src'
import { ethers } from 'ethers'

describe('Hex String Utils', () => {
  describe('remove0x', () => {
    const tests = [
      {
        title: 'when string has leading 0x',
        args: '0x12341234',
        expected: '12341234',
      },
      {
        title: 'when string has no leading 0x',
        args: '12341234',
        expected: '12341234',
      },
      // { title: 'when string is not a valid hex string', args: '0x0x12341234', expected: '???' } // Probably should be a test case
    ]

    for (const test of tests) {
      it(test.title, () => {
        const output = remove0x(test.args)
        expect(output).to.equal(test.expected)
      })
    }
  })

  describe('add0x', () => {
    const tests = [
      {
        title: 'when string has leading 0x',
        args: '0x12341234',
        expected: '0x12341234',
      },
      {
        title: 'when string has no leading 0x',
        args: '12341234',
        expected: '0x12341234',
      },
    ]

    for (const test of tests) {
      it(test.title, () => {
        const output = add0x(test.args)
        expect(output).to.equal(test.expected)
      })
    }
  })

  describe('isHexString', () => {
    const tests = [
      {
        title: 'when string has leading 0x',
        args: '0x12341234',
        expected: true,
      },
      {
        title: 'when string has no leading 0x',
        args: '12341234',
        expected: false,
      },
      { title: 'when input is a number', args: 12341234, expected: false },
      {
        title: 'when input is a Buffer',
        args: Buffer.from('12341234', 'hex'),
        expected: false,
      },
      {
        title: 'when input is a BigNumber',
        args: ethers.BigNumber.from(12341234),
        expected: false,
      },
    ]

    for (const test of tests) {
      it(test.title, () => {
        const output = isHexString(test.args)
        expect(output).to.equal(test.expected)
      })
    }
  })

  describe('toHexString', () => {
    const tests = [
      {
        title: 'string with leading 0x',
        args: '0x12341234',
        expected: '0x12341234',
      },
      {
        title: 'string with no leading 0x',
        args: '0x12341234',
        expected: '0x12341234',
      },
      { title: 'number input', args: 305402420, expected: '0x12341234' },
      {
        title: 'Buffer input',
        args: Buffer.from('12341234', 'hex'),
        expected: '0x12341234',
      },
      {
        title: 'BigNumber input',
        args: ethers.BigNumber.from(305402420),
        expected: '0x12341234',
      },
    ]

    for (const test of tests) {
      it(test.title, () => {
        const output = toHexString(test.args)
        expect(output).to.equal(test.expected)
      })
    }
  })
})
