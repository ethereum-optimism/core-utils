import { expect } from '../setup'

/* Imports: Internal */
import { getRandomHexString } from '../../src'

describe('getRandomHexString', () => {
  beforeEach(async () => {
    global.Math.random = () => 0.5
  })

  it('returns a random address string of the specified length', () => {
    expect(getRandomHexString(8)).to.equal('0x' + '88'.repeat(4))
  })
})
