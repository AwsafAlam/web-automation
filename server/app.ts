import express, { Response } from 'express'
import cors from 'cors'
import passport from 'passport'
import './middlewares/passport'
import router from './routes'

const app = express()

process.on('unhandledRejection', (error) => {
  throw error
})

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// enable cors
app.use(cors())

app.use(passport.initialize())

app.get('/status', async (_, res: Response) => {
  res
    .status(200)
    .send({ message: 'Server is up and running', version: '1.0.0' })
})

app.use('/', router)

// catch all
app.all('*', async (_, res: Response) => {
  res
    .status(501)
    .send({ message: 'This user-service route is not implemented yet' })
})

export default app
