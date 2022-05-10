import { userController } from 'controllers'
import { Router } from 'express'
import { validate } from 'middlewares'
import { auth } from 'middlewares'
import { loginValidator, registerValidator } from 'validators/userValidator'

const router = Router()

router.get('/me', auth(['user']), userController.getDetails)
router.post('/login', validate(loginValidator), userController.login)
router.post('/register', validate(registerValidator), userController.register)

// router.get('/:id', userController.getById)
// router.put(
//   '/:id',
//   userController.updateById
// )

export default router
