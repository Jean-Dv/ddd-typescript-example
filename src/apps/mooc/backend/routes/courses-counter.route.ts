import { type Request, type Response, type Router } from "express"
import container from "../dependency-injection"

export const register = (router: Router): void => {
  const coursesCounterGetController = container.get(
    "Apps.mooc.controllers.CoursesCounterGetController"
  )
  router.get("/courses-counter", (req: Request, res: Response) =>
    coursesCounterGetController.run(req, res)
  )
}
