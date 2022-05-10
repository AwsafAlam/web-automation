import { Request, Response } from 'express'
import { Roles } from 'lib/constants'
import { ModelError } from 'lib/errors'
import bcrypt from 'bcryptjs'
import { userQuery } from 'queries'
import { generateRandomText, generateSlug } from 'utils'

const login = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const register = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  let slug = generateSlug(data.username)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const userBySlug = await userQuery.getBySlug(slug)

    if (!userBySlug) break

    slug = generateSlug(data.username) + generateRandomText('-', 3)
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(data.password || '', salt)
  const response = await userQuery.createUser({
    ...data,
    slug,
    role: Roles.User,
    password: hash,
  })

  if (response instanceof ModelError) {
    res.status(400).json({ message: response.error })
    // throw new HttpException(400, response.error)
  } else {
    res.status(200).json(response)
  }
}

const getDetails = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

export default {
  login,
  register,
  getDetails,
}
