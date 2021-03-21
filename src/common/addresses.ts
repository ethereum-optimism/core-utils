/* Imports: External */
import { ethers } from 'ethers'

/* Imports: Internal */
import { getRandomHexString } from './hex-strings'

export const getRandomAddress = (): string => {
  return ethers.utils.getAddress(getRandomHexString(20))
}
