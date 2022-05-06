import { Router } from 'express'

import listingRouter from './listingRouter'
import userRouter from './userRouter'

const router = Router()

// set up basic routing for index route
router.use('/listings', listingRouter)
router.use('/users', userRouter)

export default router
