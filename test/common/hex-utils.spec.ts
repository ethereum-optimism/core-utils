import { expect } from '../setup'

/* Imports: Internal */
import { getRandomHexString } from '../../src'

describe('getRandomHexString', () => {
  const random = global.Math.random

  beforeEach(async () => {
    global.Math.random = () => 0.5
  })

  afterEach(async () => {
    global.Math.random = random
  })

  it('returns a random address string of the specified length', () => {
    expect(getRandomHexString(8)).to.equal('0x' + '88'.repeat(8))
  })
})
