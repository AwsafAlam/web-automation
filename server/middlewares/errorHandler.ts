import { Request, Response, NextFunction } from 'express'
import { HttpException } from 'lib/exceptions'

const errorHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // error level logging
  // logger.error(logger.combinedFormat(error, req, res))
  // logger.error(error.message)
  res.status(error.status || 500).send({
    message: error.message || 'Internal server error.',
  })
  next(error)
}

export default errorHandler
