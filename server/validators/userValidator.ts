import { body, ValidationChain } from 'express-validator'
import { ValidatorMessages } from './types'

export const phoneValidator: ValidationChain = body('phone')
  .exists()
  .withMessage(ValidatorMessages.Required)
  .bail()
  .isMobilePhone('bn-BD')
  .withMessage('Field must be a Bangladeshi phone number')

export const googleValidator: ValidationChain[] = [
  body('user')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isObject()
    .withMessage(ValidatorMessages.Object),
  body('user.email')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String)
    .matches(/^(\w|\.)*@(\w|\.)*\.(\w|\.)*$/)
    .withMessage('Field must be an email'),
  body('user.uid')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
]

export const loginValidator: ValidationChain[] = [
  phoneValidator,
  body('password')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
]

export const changePassword: ValidationChain[] = [
  ...loginValidator,
  body('otp')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
]

export const registerValidator: ValidationChain[] = [
  body('username')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
  body('address').optional().isString().withMessage(ValidatorMessages.String),
  body('guardianSMS')
    .optional()
    .isString()
    .withMessage(ValidatorMessages.String),
  ...loginValidator,
]

export const tokenValidator: ValidationChain[] = [
  body('refreshToken')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isJWT()
    .withMessage('Field must be a JWT'),
]

export const changePasswordValidator: ValidationChain[] = [
  body('currentPassword')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
  body('newPassword')
    .exists()
    .withMessage(ValidatorMessages.Required)
    .bail()
    .isString()
    .withMessage(ValidatorMessages.String),
]

export const typeValidator: ValidationChain = body('type')
  .exists()
  .withMessage(ValidatorMessages.Required)
  .bail()
  .not()
  .isString()
  .withMessage('Field must be a number')
  .bail()
  .matches(/1111|2222|9999/)
  .withMessage('Field must be 1111, 2222 or 9999')

export const userUpdateValidator: ValidationChain[] = [
  body('username').optional().isString().withMessage(ValidatorMessages.String),
  body('email')
    .optional()
    .isString()
    .withMessage(ValidatorMessages.String)
    .matches(/^(\w|\.)*@(\w|\.)*\.(\w|\.)*$/)
    .withMessage('Field must be an email'),
]
