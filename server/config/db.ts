import { Sequelize } from 'sequelize'

const isDev = process.env.NODE_ENV === 'dev'

const dbHost = process.env.DB_HOST
const dbName = isDev
  ? (process.env.DEV_DB_NAME as string)
  : (process.env.DB_NAME as string)
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASS as string

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
})

export default sequelizeConnection
