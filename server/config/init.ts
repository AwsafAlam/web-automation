import { User, Listing } from 'models'

// const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV !== 'test'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const dbInit = () =>
  Promise.all([
    // User.sync({ alter: isDev || isTest }),
    // Listing.sync({ alter: isDev || isTest }),
    User.sync({ alter: true }),
    Listing.sync({ alter: true }),
  ])

export default dbInit
