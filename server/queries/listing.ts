import { Listing } from 'models'
import { ListingInput, ListingOutput } from 'models/Listing'
import { ModelError } from 'lib/errors'
import { logQueryError } from 'lib/logging'

const createListing = async (
  data: ListingInput
): Promise<ListingOutput | ModelError> => {
  try {
    const listing = await Listing.create(data)
    return listing
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('listingModel', createListing.name, modelError.error)
    return modelError
  }
}

const getAll = async (): Promise<ListingOutput[]> =>
  await Listing.findAll({ limit: 100, offset: 0 })

const getBySlug = async (
  slug: string
): Promise<ListingOutput | null | ModelError> => {
  try {
    const listing = await Listing.findOne({ where: { slug: slug } })
    return listing
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('listingModel', getBySlug.name, modelError.error)
    return modelError
  }
}

export const update = async (
  id: number,
  payload: Partial<ListingInput>
): Promise<ListingOutput> => {
  const listing = await Listing.findByPk(id)

  if (!listing) {
    //@todo throw custom error
    throw new Error('not found')
  }

  return listing.update(payload)
}

export const getById = async (id: number): Promise<ListingOutput> => {
  const listing = await Listing.findByPk(id)

  if (!listing) {
    //@todo throw custom error
    throw new Error('not found')
  }

  return listing
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedListings = await Listing.destroy({
    where: { id },
  })

  return !!numDeletedListings
}

export default {
  createListing,
  update,
  getById,
  deleteById,
  getAll,
  getBySlug,
}
