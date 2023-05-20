import { type Request, type Response } from "express"
import httpStatus from "http-status"

import { type Controller } from "./Controller"

class StatusGetController implements Controller {
  run(req: Request, res: Response): void {
    res.status(httpStatus.OK).send()
  }
}

export default StatusGetController
