import { Router } from 'express'
import listingRouter from './listingRouter'
import requestRouter from './requestRouter'

const router = Router()

// set up basic routing for index route
router.use('/listings', listingRouter)
router.use('/requests', requestRouter)

export default router
