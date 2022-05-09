import { User, Listing, Request } from 'models'

// const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV !== 'test'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const dbInit = () =>
  Promise.all([
    // User.sync({ alter: isDev || isTest }),
    // Listing.sync({ alter: isDev || isTest }),
    // User.sync({ alter: true, force: false }),
    // Listing.sync({ alter: true, force: false }),
    // Request.sync({ alter: true, force: false }),
    User.sync({ alter: false }),
    Listing.sync({ alter: false }),
    Request.sync({ alter: false }),
  ])

export default dbInit
