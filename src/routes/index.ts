import { Router } from 'express'
import { createDietController } from '../controllers/create-diet.controller'

const router = Router()

router.post('/create-diet', createDietController)

export default router
