import { expect } from '../setup'

/* Imports: Internal */
import { getRandomAddress } from '../../src'

describe('getRandomAddress', () => {
  beforeEach(async () => {
    global.Math.random = () => 0.5
  })

  it('returns a random address string', () => {
    expect(getRandomAddress()).to.equal('0x' + '88'.repeat(20))
  })
})
