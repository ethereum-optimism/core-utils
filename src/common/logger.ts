/* Imports: External */
import debug from 'debug'
import colors from 'colors/safe'

/**
 * A small logging utility.
 */
export class Logger {
  /**
   * @param namespace Namespace to attribute logs to.
   */
  constructor(public namespace: string) {}

  /**
   * For printing basic informational logs.
   * @param message Message to print.
   */
  public info(message: string): void {
    this._log(message, 'INFO', 'cyan')
  }

  /**
   * For printing service status logs.
   * @param message Message to print.
   */
  public status(message: string): void {
    this._log(message, 'STATUS', 'magenta')
  }

  /**
   * For printing potentially interesting logs.
   * @param message Message to print.
   */
  public interesting(message: string): void {
    this._log(message, 'INFO', 'yellow')
  }

  /**
   * For printing logs representing a success.
   * @param message Message to print.
   */
  public success(message: string): void {
    this._log(message, 'SUCCESS', 'green')
  }

  /**
   * For printing logs representing an error.
   * @param message Message to print.
   */
  public error(message: string): void {
    this._log(message, 'ERROR', 'red')
  }

  /**
   * For printing logs as a warning.
   * @param message Message to print.
   */
  public warn(message: string): void {
    this._log(message, 'WARNING', 'orange')
  }

  /**
   * For printing debug logs.
   * @param message Message to print.
   */
  public debug(...logs: any[]): void {
    debug(joinNewLines(...logs))
  }

  /**
   * Internal logging function.
   * @param message Message to print.
   * @param category Category to attach to the message.
   * @param color Color to print the log with.
   */
  private _log(message: string, category: string, color: string): void {
    // tslint:disable-next-line
    console.log(
      `${colors[color](`[${this.namespace}] [${category}]`)}: ${message}`
    )
  }
}

export const logError = (logger: Logger, message: string, e: Error): void => {
  logger.error(`${message}. 
    Error: ${e.message}. 
    Stack: ${e.stack}`)
}

export const LOG_NEWLINE_STRING = process.env.LOG_NEW_LINES ? '\n' : ' <\\n> '

/**
 * Converts one or more items to log into a single line string.
 *
 * @param logs The array of items to log
 * @returns The single-line string.
 */
const joinNewLines = (...logs: any[]): string => {
  const stringifiedLogs = []
  for (const l of logs) {
    if (typeof l !== 'string') {
      stringifiedLogs.push(JSON.stringify(l))
    } else {
      stringifiedLogs.push(l)
    }
  }

  return stringifiedLogs.join(' ').replace(/\n/g, LOG_NEWLINE_STRING)
}
