import { Sequelize } from 'sequelize'
// import { SequelizeHooks } from 'sequelize/types/lib/hooks'

// const isTest = process.env.NODE_ENV === 'test'

// const dbName = isTest
//   ? (process.env.TEST_DB_NAME as string)
//   : (process.env.DB_NAME as string)
const dbName = 'cookbook'
// const dbUser = process.env.DB_USER as string
const dbUser = 'root'
const dbPassword = ''
// const dbHost = process.env.DB_HOST
// const dbDriver = process.env.DB_DRIVER as Dialect
// const dbPassword = process.env.DB_PASS

// const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
//   afterUpdate: (instance: Model<any, any>) => {
//     const cacheKey = `${instance.constructor.name.toLowerCase()}s`

//     const currentData = instance.get({ plain: true })

//     if (!localCache.hasKey(cacheKey)) {
//       return
//     }

//     const listingData = localCache.get<any>(cacheKey) as any[]
//     const itemIndex = listingData.findIndex(
//       (it) => it.id === instance.getDataValue('id')
//     )
//     const oldItemData = ~itemIndex ? listingData[itemIndex] : {}

//     const instanceDiff = diff(oldItemData, currentData)

//     if (instanceDiff.length > 0) {
//       listingData[itemIndex] = currentData
//       localCache.set(cacheKey, listingData)
//     }
//   },
//   afterCreate: (instance: Model<any, any>) => {
//     const cacheKey = `${instance.constructor.name.toLowerCase()}s`
//     const currentData = instance.get({ plain: true })

//     if (!localCache.hasKey(cacheKey)) {
//       return
//     }

//     const listingData = localCache.get<any>(cacheKey) as any[]
//     listingData.push(currentData)

//     localCache.set(cacheKey, listingData)
//   },
// }

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  // host: dbHost,
  // dialect: dbDriver,
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
})

export default sequelizeConnection
