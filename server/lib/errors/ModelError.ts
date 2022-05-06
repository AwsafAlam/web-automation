import sequelize from 'sequelize'

export class ModelError {
  error: string | undefined

  constructor(error: Error | string | undefined) {
    this.error = this.processError(error)
  }

  processError(error: Error | string | undefined): string | undefined {
    if (error === undefined) {
      return undefined
    } else if (typeof error === 'string') {
      return error
    } else if (error instanceof sequelize.ValidationError) {
      let errors = ''

      error.errors.forEach((error) => {
        errors += error.message + ', '
      })

      return errors
    } else if (error instanceof Error) {
      return error.message
    } else {
      return 'Mongo error'
    }
  }
}
