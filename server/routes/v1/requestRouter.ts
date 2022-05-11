import { requestController } from 'controllers'
import { Router } from 'express'
import { validate } from 'middlewares'
import { updateRequestValidator } from 'validators/requestValidator'

const router = Router()

router.get('/', requestController.getAll).post('/', requestController.add)
router
  .get('/:id', requestController.getById)
  .put('/:id', validate(updateRequestValidator), requestController.updateById)

export default router
