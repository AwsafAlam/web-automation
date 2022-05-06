import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

type Role = 'super-admin' | 'admin' | 'user'

export const allRoles: Role[] = ['super-admin', 'admin', 'user']
export const adminRole: Role[] = ['admin']

const auth =
  (roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const finalRoles = roles

    if (roles.includes('user') && !roles.includes('admin')) {
      finalRoles.push('admin')
    }

    if (roles.includes('admin') && !roles.includes('super-admin')) {
      finalRoles.push('super-admin')
    }

    passport.authenticate(finalRoles, { session: false, failureMessage: true })(
      req,
      res,
      next
    )
  }

export default auth
