import { Request, Response } from 'express'
import { ModelError } from 'lib/errors'
import { RequestInput } from 'models/Request'
import { requestQuery } from 'queries'
import { RequestId } from './types'

const add = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  const response = await requestQuery.createRequest(data)

  if (response instanceof ModelError) {
    res.status(400).json({ message: response.error })
    // throw new HttpException(400, response.error)
  } else {
    res.status(200).json(response)
  }
}

const getAll = async (_: Request, res: Response): Promise<void> => {
  const requests = await requestQuery.getAll()
  res.status(200).json(requests)
}

const getById = async (
  req: Request<RequestId>,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const request = await requestQuery.getById(id)

  if (!request) {
    res.status(404).json({ message: 'Request not found' })
  } else if (request instanceof ModelError) {
    res.status(400).json({ message: 'Request not found' })
  } else {
    res.status(200).json({ response: true })
  }
}

const updateById = async (
  req: Request<never, never, RequestInput>,
  res: Response
): Promise<void> => {
  const data = req.body
  const { id } = req.params
  const request = await requestQuery.update(id, data)

  if (!request) {
    res.status(404).json({ message: 'Request not found' })
  } else if (request instanceof ModelError) {
    res.status(400).json({ message: 'Request not found' })
  } else {
    res.status(200).json(request)
  }
}

const getOneUncrawled = async (_: Request, res: Response): Promise<void> => {
  const response = await requestQuery.getOneUncrawled()

  if (!response) {
    res.status(404).json({ message: 'Request not found' })
  } else if (response instanceof ModelError) {
    res.status(400).json({ message: 'Request not found' })
  } else {
    res.status(200).json(response)
  }
}

export default {
  add,
  getAll,
  getById,
  updateById,
  getOneUncrawled,
}
