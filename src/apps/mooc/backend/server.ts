import { json, urlencoded } from "body-parser"
import compress from "compression"
import errorHandler from "errorhandler"
import express, { type Request, type Response } from "express"
import Router from "express-promise-router"
import helmet from "helmet"
import type * as http from "http"
import httpStatus from "http-status"

import { load as loadDependencies } from "./dependency-injection"
import { registerRoutes } from "./routes"

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
    this.express.use(compress())
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: "deny" }))
  }

  private async routes(): Promise<void> {
    const router = Router()
    await loadDependencies()
    router.use(errorHandler())
    this.express.use(router)
    registerRoutes(router)
    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      console.log(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    })
  }

  async listen(): Promise<void> {
    await this.routes()
    await new Promise<void>((resolve) => {
      const env = this.express.get("env") as string
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`
        )
        console.log("  Press CTRL-C to stop\n")
        resolve()
      })
    })
  }

  getHTTPServer(): Server["httpServer"] {
    return this.httpServer
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close((error) => {
          if (error != null) {
            reject(error)
            return
          }
          resolve()
        })
      }
      resolve()
    })
  }
}
