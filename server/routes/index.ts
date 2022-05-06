import { Router } from 'express'

import listingRouter from './listingRouter'

const router = Router()

// set up basic routing for index route
router.use('/listings', listingRouter)
// router.use('/', userRouter)

export default router
