import pino, {
  Logger as PinoLogger,
  LoggerOptions as PinoLoggerOptions,
} from 'pino'

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface LoggerOptions {
  name: string
  level?: LogLevel
}

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

  return new Logger({ name: identifier })
}

/**
 * Temporary wrapper class to maintain earlier module interface.
 */
export class Logger {
  options: LoggerOptions
  inner: pino.Logger

  constructor(options: LoggerOptions) {
    this.options = options

    const loggerOptions = {
      name: options.name,

      level: options.level || 'debug',

      // Remove pid and hostname considering production runs inside docker
      base: null,
    }

    this.inner = pino(loggerOptions)
  }

  child(bindings: pino.Bindings): Logger {
    const inner = this.inner.child(bindings)
    const logger = new Logger(this.options)
    logger.inner = inner
    return logger
  }

  trace(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.trace(o, msg, ...args)
    } else {
      this.inner.trace(msg, ...args)
    }
  }

  debug(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.debug(o, msg, ...args)
    } else {
      this.inner.debug(msg, ...args)
    }
  }

  info(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.info(o, msg, ...args)
    } else {
      this.inner.info(msg, ...args)
    }
  }

  warn(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.warn(o, msg, ...args)
    } else {
      this.inner.warn(msg, ...args)
    }
  }

  warning(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.warn(o, msg, ...args)
    } else {
      this.inner.warn(msg, ...args)
    }
  }

  error(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.error(o, msg, ...args)
    } else {
      this.inner.error(msg, ...args)
    }
  }

  fatal(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.fatal(o, msg, ...args)
    } else {
      this.inner.fatal(msg, ...args)
    }
  }

  crit(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.fatal(o, msg, ...args)
    } else {
      this.inner.fatal(msg, ...args)
    }
  }

  critical(msg: string, o?: object, ...args: any[]): void {
    if (o) {
      this.inner.fatal(o, msg, ...args)
    } else {
      this.inner.fatal(msg, ...args)
    }
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
