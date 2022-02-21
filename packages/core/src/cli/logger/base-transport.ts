import pinoPretty from 'pino-pretty'
import pino from 'pino'

export default async (options: pino.TransportBaseOptions) => {
  return pinoPretty({
    ...options,
    messageFormat: (log, messageKey) => `hello ${log[messageKey]}`,
    customPrettifiers: {
      // The argument for this function will be the same
      // string that's at the start of the log-line by default:
      time: (timestamp) => `🕰 ${timestamp}`,

      // The argument for the level-prettifier may vary depending
      // on if the levelKey option is used or not.
      // By default this will be the same numerics as the Pino default:
      level: (logLevel) => `LEVEL: ${logLevel}`,

      // other prettifiers can be used for the other keys if needed, for example
      hostname: (hostname) => `${hostname}`,
      pid: (pid) => `${pid}`,
      name: (name) => `${name}yoooo`,
      caller: (caller) => `${caller}`,
    },
  })
}
