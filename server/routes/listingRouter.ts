import { listingController } from 'controllers'
import { Router } from 'express'
import { validate } from 'middlewares'
import { auth } from 'middlewares'
import { updateListingValidator } from 'validators/listingValidator'

const router = Router()

router.get('/', listingController.getAll)
router.post('/', auth(['admin', 'user']), listingController.add)

router.get('/:slug', listingController.getBySlug)
router.put(
  '/:slug',
  validate(updateListingValidator),
  listingController.updateBySlug
)

export default router
