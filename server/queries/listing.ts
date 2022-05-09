import { Listing } from 'models'
import { ListingInput, ListingOutput } from 'models/Listing'
import { ModelError } from 'lib/errors'
import { logQueryError } from 'lib/logging'
import { Op } from 'sequelize'

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

const createMany = async (
  data: ListingInput[]
): Promise<ListingOutput[] | ModelError> => {
  try {
    const listing = await Listing.bulkCreate(data)
    return listing
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('listingModel', createListing.name, modelError.error)
    return modelError
  }
}

const getAll = async (): Promise<ListingOutput[]> =>
  await Listing.findAll({ limit: 100, offset: 0 })

const getAllFiltered = async (
  name?: string,
  city?: string,
  state?: string
): Promise<ListingOutput[] | ModelError> => {
  const filters = []

  if (name) {
    filters.push({ name: { [Op.like]: `%${name}%` } })
  }
  if (city) {
    filters.push({ city: { [Op.like]: `%${city}%` } })
  }
  if (state) {
    filters.push({ state: { [Op.like]: `%${state}%` } })
  }

  try {
    const listings = await Listing.findAll({
      attributes: ['id', 'name', 'slug', 'address', 'type', 'city', 'state'],
      where: {
        [Op.and]: filters,
      },
      order: [['createdAt', 'DESC']],
      limit: 50,
    })
    return listings
  } catch (error) {
    const modelError = new ModelError(error)
    logQueryError('listingModel', getBySlug.name, modelError.error)
    return modelError
  }
}
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

export const updateImage = async (
  id: number,
  imageUrl: string[]
): Promise<ListingOutput> => {
  let listing = await Listing.findByPk(id)

  if (!listing) {
    //@todo throw custom error
    throw new Error('not found')
  }
  const images = listing.images
  if (images) {
    images.push(...imageUrl)
    listing = await listing.update({ images: images })
  } else {
    listing = await listing.update({ images: imageUrl })
  }

  return listing
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
  createMany,
  update,
  updateImage,
  getAllFiltered,
  getById,
  deleteById,
  getAll,
  getBySlug,
}
