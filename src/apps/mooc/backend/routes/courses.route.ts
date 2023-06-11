import { type Request, type Response, type Router } from "express"
import { body } from "express-validator"
import { validateReqSchema } from "."
import container from "../dependency-injection"

export const register = (router: Router): void => {
  const reqSchema = [
    body("id").exists().isString(),
    body("name").exists().isString(),
    body("duration").exists().isString(),
  ]
  console.log(container.services)
  const coursePutController = container.get(
    "Apps.mooc.controllers.CoursePutController"
  )
  router.put(
    "/courses/:id",
    reqSchema,
    validateReqSchema,
    (req: Request, res: Response) => {
      coursePutController.run(req, res)
    }
  )
}
