import { Request, Response } from 'express'

const getAll = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const add = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const updateBySlug = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const getBySlug = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

export default {
  getAll,
  add,
  getBySlug,
  updateBySlug,
}
