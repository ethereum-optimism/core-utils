import pino, { Logger as PinoLogger } from 'pino'

/**
 * Forackwards compatibility:
 * Gets a logger specific to the provided identifier.
 *
 * @param identifier The identifier to use to tag log statements from this logger.
 * @param isTest Whether or not this is a test logger.
 * @param debugToUseTestOnly The debug instance to use *should only be used for tests*
 * @returns a Logger instance.
 */
export const getLogger = (
  identifier: string,
  isTest: boolean = false,
  debugToUseTestOnly?: any
): Logger => {
  console.warn(`\`getLogger\` is now a legacy function and will soon be deprecated.
                Please use \`new Logger(namespace)\` instead.`)

  if (debugToUseTestOnly) {
    console.warn(`Passing in a debugToUseTestOnly instance is now deprecated.`)
  }

  return new Logger(identifier, isTest)
}

/**
 * Temporary wrapper class to maintain earlier module interface.
 */
export class Logger {
  constructor(namespace: string, isTest = false) {
    return pino({
      // Pretty printing enabled by default to maintain expectations
      prettyPrint: {
        colorize: true,
      },
    }).child({
      module: namespace,
      isTest,
    })
  }
}

export const logError = (
  logger: PinoLogger,
  message: string,
  e: Error
): void => {
  logger.error(`${message}. 
    Error: ${e.message}. 
    Stack: ${e.stack}`)
}

export const LOG_NEWLINE_STRING = process.env.LOG_NEW_LINES ? '\n' : ' <\\n> '
