// import { db } from './utils'
import config from 'config'
import './middlewares/passport'
import app from './app'
import dbInit from 'config/init'

void dbInit()

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
)
