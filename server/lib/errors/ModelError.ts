import sequelize from 'sequelize'

export class ModelError {
  error: string

  constructor(error: unknown) {
    this.error = this.processError(error)
  }

  processError(error: unknown): string {
    if (error === undefined) {
      return 'Unknown error'
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
