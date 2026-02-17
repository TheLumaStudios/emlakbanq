const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }

const currentLevel = import.meta.env.DEV ? 'debug' : 'info'

function createLogEntry(level, message, data = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
    environment: import.meta.env.MODE,
  }
}

function shouldLog(level) {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel]
}

export const logger = {
  debug: (message, data) => {
    if (shouldLog('debug')) console.debug(JSON.stringify(createLogEntry('debug', message, data)))
  },
  info: (message, data) => {
    if (shouldLog('info')) console.info(JSON.stringify(createLogEntry('info', message, data)))
  },
  warn: (message, data) => {
    if (shouldLog('warn')) console.warn(JSON.stringify(createLogEntry('warn', message, data)))
  },
  error: (message, data) => {
    if (shouldLog('error')) console.error(JSON.stringify(createLogEntry('error', message, data)))
  },
}
