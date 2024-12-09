import { Request, Response } from 'express'
import { createDietSchema } from '../dtos/create-diet.dto'
import { createDietService } from '../services/create-diet.service'

export const createDietController = async (req: Request, res: Response) => {
  try {
    const parsedData = createDietSchema.safeParse(req.body)

    if (!parsedData.success) {
      const errorDetails = parsedData.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))

      res.status(400).json({
        error: 'Dados inválidos',
        details: errorDetails,
      })
      return
    }

    const data = parsedData.data

    const diet = await createDietService(data)

    if (!diet) {
      res.status(500).json({
        error: 'Erro ao gerar dieta, tente novamente mais tarde.',
      })
      return
    }
    res.status(201).json(diet)
  } catch (err) {
    console.error('Erro inesperado:', err)
    res.status(500).json({
      error: 'Erro inesperado. Tente novamente mais tarde.',
    })
  }
}
