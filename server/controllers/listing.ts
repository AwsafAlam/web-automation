import { Request, Response } from 'express'
import { ModelError } from 'lib/errors'
import { ListingInput } from 'models/Listing'
import { listingQuery } from 'queries'
import { generateRandomText, generateSlug } from 'utils'
import { Slug, ListingId } from './types'

const add = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  let slug = generateSlug(data.name)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const userBySlug = await listingQuery.getBySlug(slug)

    if (!userBySlug) break

    slug = generateSlug(data.username) + generateRandomText('-', 3)
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

const getAll = async (_: Request, res: Response): Promise<void> => {
  const listings = await listingQuery.getAll()
  res.status(200).json(listings)
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

const updateById = async (
  req: Request<ListingId, never, ListingInput>,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = req.body
  const listing = await listingQuery.update(id, data)

  if (!listing) {
    res.status(404).json({ message: 'Listing not found' })
  } else if (listing instanceof ModelError) {
    res.status(400).json({ message: 'Listing not found' })
  } else {
    res.status(200).json(listing)
  }
}

const updateBySlug = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({ response: true })
}

const getBySlug = async (req: Request<Slug>, res: Response): Promise<void> => {
  const { slug } = req.params
  const listing = await listingQuery.getBySlug(slug)

  if (!listing) {
    res.status(404).json({ message: 'Listing not found' })
  } else if (listing instanceof ModelError) {
    res.status(400).json({ message: 'Listing not found' })
  } else {
    res.status(200).json({ response: true })
  }
}

export default {
  add,
  getAll,
  getBySlug,
  getById,
  updateById,
  updateBySlug,
}
