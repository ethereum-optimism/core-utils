import { expect } from '../setup'

interface TestDefinition {
  title: string
  args: any
  expected: any
  expectError?: boolean
}

/**
 * Mini helper function for running a series of parametrized tests.
 * @param tests Tests to run.
 * @param func Function to test against.
 */
export const runTests = (tests: TestDefinition[], func: Function) => {
  for (const test of tests) {
    it(test.title, () => {
      if (test.expectError) {
        expect(func(test.args)).to.throw(test.expected)
      } else {
        expect(func(test.args)).to.equal(test.expected)
      }
    })
  }
}
