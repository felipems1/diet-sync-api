import { z } from 'zod'

export const createDietSchema = z.object({
  name: z.string().min(1, { message: 'O nome não pode estar vazio' }),
  weight: z.string().min(1, { message: 'O peso não pode estar vazio' }),
  height: z.string().min(1, { message: 'A altura não pode estar vazia' }),
  age: z.string().min(1, { message: 'A idade não pode estar vazia' }),
  gender: z.string().min(1, { message: 'O gênero não pode estar vazio' }),
  objective: z.string().min(1, { message: 'O objetivo não pode estar vazio' }),
  level: z.string().min(1, { message: 'O nível não pode estar vazio' }),
})

export type CreateDietType = z.infer<typeof createDietSchema>
