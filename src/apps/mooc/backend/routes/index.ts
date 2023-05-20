import { type Router } from "express"
import { globSync } from "glob"

export function registerRoutes(router: Router): void {
  // eslint-disable-next-line n/no-path-concat
  const routes = globSync(`${__dirname}/**/*.route.{js,ts}`)
  routes.forEach((route) => {
    register(route, router)
  })
}

function register(routePath: string, router: Router): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { register } = require(routePath) as {
    register: (router: Router) => void
  }
  register(router)
}
