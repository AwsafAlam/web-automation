import { listingController } from 'controllers'
import { Router } from 'express'
import { validate } from 'middlewares'
// import { auth } from 'middlewares'
import { updateListingValidator } from 'validators/listingValidator'

const router = Router()

router.get('/', listingController.getAll).post('/', listingController.add)

router
  .get('/:slug', listingController.getBySlug)
  .put(
    '/:slug',
    validate(updateListingValidator),
    listingController.updateBySlug
  )

router
  .get('/:id', listingController.getById)
  .put('/:id', listingController.updateById)

export default router
