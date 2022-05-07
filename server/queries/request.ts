import { Request } from 'models'
import { RequestInput, RequestOutput } from 'models/Request'
import { ModelError } from 'lib/errors'
import { logQueryError } from 'lib/logging'

const createRequest = async (
  data: RequestInput
): Promise<RequestOutput | ModelError> => {
  try {
    const request = await Request.create(data)
    return request
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('requestModel', createRequest.name, modelError.error)
    return modelError
  }
}

const getAll = async (): Promise<RequestOutput[]> =>
  await Request.findAll({ limit: 100, offset: 0 })

const getOneUncrawled = async (): Promise<
  RequestOutput | null | ModelError
> => {
  try {
    const request = await Request.findOne({ where: { crawled: false } })
    return request
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('requestModel', getOneUncrawled.name, modelError.error)
    return modelError
  }
}

export const update = async (
  id: number,
  payload: Partial<RequestInput>
): Promise<RequestOutput> => {
  const request = await Request.findByPk(id)

  if (!request) {
    //@todo throw custom error
    throw new Error('not found')
  }

  return request.update(payload)
}

export const getById = async (id: number): Promise<RequestOutput> => {
  const request = await Request.findByPk(id)

  if (!request) {
    //@todo throw custom error
    throw new Error('not found')
  }

  return request
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedRequests = await Request.destroy({
    where: { id },
  })

  return !!numDeletedRequests
}

export default {
  createRequest,
  update,
  getById,
  deleteById,
  getAll,
  getOneUncrawled,
}
