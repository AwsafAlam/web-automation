import { listingController } from 'controllers'
import { Router } from 'express'
import uploadMultipleImages from 'middlewares/uploadMultiple'
import { multer } from 'utils'

const router = Router()

router.get('/', listingController.getAll)
router.post('/search', listingController.searchListing)
router.put(
  '/images',
  multer.array('images'),
  uploadMultipleImages,
  listingController.uploadImages
)

router.get('/:slug', listingController.getBySlug)

export default router
