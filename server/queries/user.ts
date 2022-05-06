import { ModelError } from 'lib/errors'
import { logQueryError } from 'lib/logging'
import { User } from 'models'
import { UserInput, UserOutput } from 'models/User'

const createUser = async (
  data: UserInput
): Promise<UserOutput | ModelError> => {
  try {
    const user = await User.create(data)
    return user
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('userModel', createUser.name, modelError.error)
    return modelError
  }
}

const getAll = async (): Promise<UserOutput[]> => {
  const users = await User.findAll()

  return users
}

const getBySlug = async (
  slug: string
): Promise<UserOutput | null | ModelError> => {
  try {
    const user = await User.findOne({ where: { slug: slug } })
    return user
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('userModel', createUser.name, modelError.error)
    return modelError
  }
}

export default {
  createUser,
  getAll,
  getBySlug,
}
