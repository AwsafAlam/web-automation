import { Request, Response } from 'express'
import { ModelError } from 'lib/errors'
import { ListingInput } from 'models/Listing'
import { listingQuery } from 'queries'
import { generateRandomText, generateSlug } from 'utils'
import { Slug, ListingId, SuccessMessage } from './types'

const add = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  let slug = generateSlug(data.name)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const userBySlug = await listingQuery.getBySlug(slug)

    if (!userBySlug) break

    slug = generateSlug(data.name) + generateRandomText('-', 3)
  }

  const response = await listingQuery.createListing({
    ...data,
    slug,
  })

  if (response instanceof ModelError) {
    res.status(400).json({ message: response.error })
    // throw new HttpException(400, response.error)
  } else {
    res.status(200).json(response)
  }
}

const addMany = async (
  req: Request<never, never, ListingInput[]>,
  res: Response
): Promise<void> => {
  const listingData = req.body

  const responses: SuccessMessage[] = []
  //! Note: We are not using createMany here in order to have better error handling
  for (let i = 0; i < listingData.length; i++) {
    const element = listingData[i]

    let slug = generateSlug(element.name)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const userBySlug = await listingQuery.getBySlug(slug)

      if (!userBySlug) break

      slug = generateSlug(element.name) + generateRandomText('-', 3)
    }

    const response = await listingQuery.createListing({
      ...element,
      slug,
    })
    if (response instanceof ModelError) {
      // search by govId and edit the data.
      responses.push({ message: response.error })
    } else {
      responses.push({ message: `Created listing[${response.id}]` })
    }
  }

  res.status(200).json(responses)
}

const getAll = async (_: Request, res: Response): Promise<void> => {
  const listings = await listingQuery.getAll()
  res.status(200).json(listings)
}

const searchListing = async (req: Request, res: Response): Promise<void> => {
  const { name, city, state } = req.body
  const listings = await listingQuery.getAllFiltered(name, city, state)

  if (listings instanceof ModelError) {
    res.status(400).json({ message: listings.error })
  } else {
    res.status(200).json(listings)
  }
}

const getById = async (
  req: Request<ListingId>,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const listing = await listingQuery.getById(id)

  if (!listing) {
    res.status(404).json({ message: 'Listing not found' })
  } else if (listing instanceof ModelError) {
    res.status(400).json({ message: 'Listing not found' })
  } else {
    res.status(200).json({ response: true })
  }
}

const updateBygovSiteId = async (
  req: Request<ListingId, never, ListingInput>,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = req.body
  const listing = await listingQuery.updatebyGovSite(id, data)

  if (!listing) {
    res.status(404).json({ message: 'Listing not found' })
  } else if (listing instanceof ModelError) {
    res.status(400).json({ message: 'Listing not found' })
  } else {
    res.status(200).json(listing)
  }
}

const uploadImages = async (
  req: Request<never, never, { id: number }>,
  res: Response
): Promise<void> => {
  const { id } = req.body
  const { images } = res.locals

  const response = await listingQuery.updateImage(id, images)

  res.status(200).json(response)
}

const getBySlug = async (req: Request<Slug>, res: Response): Promise<void> => {
  const { slug } = req.params
  const listing = await listingQuery.getBySlug(slug)

  if (!listing) {
    res.status(404).json({ message: 'Listing not found' })
  } else if (listing instanceof ModelError) {
    res.status(400).json({ message: 'Listing not found' })
  } else {
    res.status(200).json(listing)
  }
}

export default {
  add,
  addMany,
  uploadImages,
  getAll,
  searchListing,
  getBySlug,
  getById,
  updateBygovSiteId,
}
