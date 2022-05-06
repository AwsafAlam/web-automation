import { Logger } from '../logging'

interface IControllerError {
  error: boolean
  message: string
  origin: void
  type: string
  status: number
}

export class ControllerError implements IControllerError {
  error: boolean
  message: string
  origin: void
  type: string
  status: number

  constructor(message: string, origin: string, type: string, status: number) {
    this.error = true
    this.status = status
    this.message = message
    this.origin = (() => {
      Logger.error({
        origin: origin, // which service
        type: 'Controller Level Error: Error occurred in ' + type, // which controller
        error: message, // error message
      })
    })()
  }
}
