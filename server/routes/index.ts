import { Router } from 'express'
import userRouter from './userRouter'
import listingRouter from './listingRouter'
import requestRouter from './requestRouter'

const router = Router()

// set up basic routing for index route
router.use('/listings', listingRouter)
router.use('/requests', requestRouter)
router.use('/users', userRouter)

export default router
