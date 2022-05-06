import { Logger } from '../logging'

interface IControllerError {
  error: boolean
  message: string

  // service
  origin: string

  type: string
  status: number
}

export class ControllerError implements IControllerError {
  error: boolean
  message: string
  origin: string
  type: string
  status: number

  constructor(message: string, origin: string, type: string, status: number) {
    this.error = true
    this.status = status
    this.message = message
    this.type = type
    this.origin = origin

    Logger.error({
      origin,
      type: 'Error occurred in controller ' + type,
      error: message,
    })
  }
}
