import { listingController } from 'controllers'
import { Router } from 'express'
import { validate } from 'middlewares'
import uploadMultipleImages from 'middlewares/uploadMultiple'
import { multer } from 'utils'
import { updateListingValidator } from 'validators/listingValidator'

const router = Router()

router.get('/', listingController.getAll).post('/', listingController.add)

router.post('/multiple', listingController.addMany)
router.post('/search', listingController.searchListing)

router.put(
  '/images',
  multer.array('images'),
  uploadMultipleImages,
  listingController.uploadImages
)

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
