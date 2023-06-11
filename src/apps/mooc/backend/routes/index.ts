import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from "express"
import { globSync } from "glob"
import { type ValidationError, validationResult } from "express-validator"
import httpStatus from "http-status"

export function registerRoutes(router: Router): void {
  // eslint-disable-next-line n/no-path-concat
  const routes = globSync(`${__dirname}/**/*.route.{js,ts}`)
  routes.forEach((route) => {
    register(route, router)
  })
}

function register(routePath: string, router: Router): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(router)
}

export function validateReqSchema(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    next()
    return
  }
  const errors = validationErrors
    .array()
    .map((err: ValidationError) => ({ [err.type]: err.msg }))
  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors })
}
