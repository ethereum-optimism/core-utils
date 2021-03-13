import { expect } from '../setup'

import {
  add0x,
  remove0x,
  isHexString,
  toHexString,
  toRpcHexString,
} from '../../src'
import { ethers } from 'ethers'
import { runTests } from '../helpers/basic-test-runner'

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

    runTests(remove0x, tests)
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

    runTests(add0x, tests)
  })

  describe('isHexString', () => {
    const tests = [
      {
        title: 'when string has leading 0x',
        args: '0x12341234',
        expected: true,
      },
      // { // This test currently fails, leaving that for another PR.
      //   title: 'when string has leading 0x but is not hexadecimal',
      //   args: '0xhellonerds',
      //   expected: false,
      // },
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

    runTests(isHexString, tests)
  })

  describe('toHexString', () => {
    const tests = [
      {
        title: 'string with leading 0x',
        args: '0x12341234',
        expected: '0x12341234',
      },
      // {
      //   title: 'string with no leading 0x', // debate: Should this return 0x12341234? Should it interpret 12341234 as an ascii string?
      //   args: '12341234',
      //   expected: '0x12341234',
      // },
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

    runTests(toHexString, tests)
  })

  describe('toRpcHexString', () => {
    const tests = [
      {
        title: 'string with leading 0x and no leading zeros',
        args: '0x12341234',
        expected: '0x12341234',
      },
      {
        title: 'string with leading 0x and leading zeros',
        args: '0x00001234',
        expected: '0x1234',
      },
      // {
      //   title: 'string with leading 0x and an odd number of leading zeros', // Debate this test!
      //   args: '0x0001234',
      //   expected: '0x1234'
      // },
      {
        title: 'number without expected leading zeros',
        args: 305402420,
        expected: '0x12341234',
      },
      {
        title: 'zero',
        args: 0,
        expected: '0x0',
      },
      {
        title: 'five',
        args: 5,
        expected: '0x5',
      },
      {
        title: 'fifteen',
        args: 15,
        expected: '0xf',
      },
      {
        title: 'sixteen',
        args: 16,
        expected: '0x10',
      },
    ]

    runTests(toRpcHexString, tests)
  })
})
