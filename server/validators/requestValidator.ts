import { body, ValidationChain } from 'express-validator'
import { ValidatorMessages } from './types'

const genericRequestValidator: ValidationChain[] = [
  body('url').optional().isString().withMessage(ValidatorMessages.String),
  body('city').optional().isString().withMessage(ValidatorMessages.String),
]

export const createRequestValidator: ValidationChain[] = [
  body('name')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
  body('type')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .matches(/assisted-living-facility|clinical-laboratory|ALL/)
    .withMessage('Field must be a valid type'),
  ...genericRequestValidator,
]

export const updateRequestValidator: ValidationChain[] = [
  body('name').optional().isString().withMessage(ValidatorMessages.String),
  body('crawled').optional().isBoolean().withMessage(ValidatorMessages.Boolean),
  ...genericRequestValidator,
  // body('requestId')
  //   .exists()
  //   .withMessage(ValidatorMessages.Required)
  //   .bail()
  //   .isMongoId()
  //   .withMessage(ValidatorMessages.MongoId),
]
