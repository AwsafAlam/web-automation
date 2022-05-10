import { listingController } from 'controllers'
import { Router } from 'express'
// import { validate } from 'middlewares'
// import { updateListingValidator } from 'validators/listingValidator'

const router = Router()

router.post('/', listingController.add)
router.post('/multiple', listingController.addMany)
router.put('/:id', listingController.updateBygovSiteId)

export default router
