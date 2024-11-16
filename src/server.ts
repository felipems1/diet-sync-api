import express from 'express'
import helmet from 'helmet'
import router from './routes'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFoundRequest } from './routes/not-found'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(notFoundRequest)

app.listen(3333, () => {
  console.log('Server Running!')
})
