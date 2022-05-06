import passport from 'passport'

// import { Role } from 'models/user'
import {
  StrategyOptions,
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt'
import config from 'config'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.token.access.secret,
}

export interface JwtPayload {
  userId: string
  tokenId: string
  username: string
  avatar: string
  slug: string
  iat: number
  // type: Role
  exp: number
}

const checkToken = async (payload: JwtPayload, done: VerifiedCallback) => {
  // const response = await userTokenQuery.update(payload.tokenId)

  // if (response instanceof ModelError) {
  //   done(null, false)
  //   return
  // } else {
  //   if (response.message === 'Success') {
  //     done(null, payload)
  //   } else {
  //     done(null, false)
  //   }
  // }
  done(null, payload)
}

passport.use(
  'user',
  new JwtStrategy(
    options,
    async (payload: JwtPayload, done: VerifiedCallback) => {
      // if (payload.type === Role.Student) {
      await checkToken(payload, done)
      // } else {
      // done(null, false)
      // }
    }
  )
)

passport.use(
  'admin',
  new JwtStrategy(
    options,
    async (payload: JwtPayload, done: VerifiedCallback) => {
      // if (payload.type === Role.Admin) {
      await checkToken(payload, done)
      // } else {
      //   done(null, false)
      // }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})
