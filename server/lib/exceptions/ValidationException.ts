import HttpException from './HttpException'

class ValidationException extends HttpException {
  constructor(message: string) {
    super(403, message)
  }
}

export default ValidationException
