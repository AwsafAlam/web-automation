// import { logger } from './winston'
export { logger as Logger } from './winston'

export const logControllerError = (
  file: string,
  method: string,
  message: string
): void => {
  console.error({
    type: 'controller',
    file,
    method,
    message,
  })
  // logger.error({
  //   type: 'controller',
  //   file,
  //   method,
  //   message,
  // })
}

export const logQueryError = (
  file: string,
  method: string,
  message: string
): void => {
  console.error({
    type: 'query',
    file,
    method,
    message,
  })
}
