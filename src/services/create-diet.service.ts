import { GoogleGenerativeAI } from '@google/generative-ai'
import { CreateDietType } from '../dtos/create-diet.dto'

export const createDietService = async (data: CreateDietType) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const response = await model.generateContent(
      `Crie uma dieta completa para uma pessoa com nome: ${data.name} do sexo ${data.gender} com peso atual: ${data.weight}kg, altura: ${data.height}, idade: ${data.age} anos e com foco e objetivo em ${data.objective}, atualmente nível de atividade: ${data.level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`,
    )

    if (response.response && response.response.candidates) {
      const jsonText = response.response.candidates[0]?.content.parts[0]
        ?.text as string

      const jsonString = jsonText
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim()

      const jsonObject = JSON.parse(jsonString)

      return { data: jsonObject }
    }
    console.error('Erro: Modelo não retornou dados válidos')
    return null
  } catch (err) {
    console.error('Erro ao gerar dieta:', err)
    return null
  }
}
