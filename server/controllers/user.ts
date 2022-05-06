import { Request, Response } from 'express'

const login = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const register = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const getDetails = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

export default {
  login,
  register,
  getDetails,
}
