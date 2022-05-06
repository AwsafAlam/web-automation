// import { db } from './utils'
import config from 'config'
import './middlewares/passport'
import { errorHandler } from './middlewares'
import app from './app'

app.use(errorHandler)

// void db(config.mysql.username, config.mysql.password)

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
)
