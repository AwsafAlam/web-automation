import { User, Listing, Request } from 'models'

// const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV !== 'test'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const dbInit = () =>
  Promise.all([
    // User.sync({ alter: isDev || isTest }),
    // Listing.sync({ alter: isDev || isTest }),
    User.sync({ alter: false, force: false }),
    Listing.sync({ alter: false, force: false }),
    Request.sync({ alter: false, force: false }),
  ])

export default dbInit
