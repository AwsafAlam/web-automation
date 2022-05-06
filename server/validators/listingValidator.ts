import { body, ValidationChain } from 'express-validator'
import { ValidatorMessages } from './types'

const genericListingValidator: ValidationChain[] = [
  body('address').optional().isString().withMessage(ValidatorMessages.String),
  body('location').optional().isObject().withMessage(ValidatorMessages.Object),
  body('location.lat')
    .optional()
    .isNumeric()
    .withMessage(ValidatorMessages.Number),
  body('location.lon')
    .optional()
    .isNumeric()
    .withMessage(ValidatorMessages.Number),
  body('website').optional().isString().withMessage(ValidatorMessages.String),
  body('coverImage')
    .optional()
    .isString()
    .withMessage(ValidatorMessages.String),
  body('logo').optional().isString().withMessage(ValidatorMessages.String),
]

export const createListingValidator: ValidationChain[] = [
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
    .matches(/assisted-living-facility|clinical-laboratory/)
    .withMessage('Field must be a valid type'),
  ...genericListingValidator,
]

export const updateListingValidator: ValidationChain[] = [
  body('listingId')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isMongoId()
    .withMessage(ValidatorMessages.MongoId),
  body('name').optional().isString().withMessage(ValidatorMessages.String),
  body('type')
    .optional()
    .matches(/assisted-living-facility|clinical-laboratory/)
    .withMessage('Field must be a valid type'),
  ...genericListingValidator,
]
