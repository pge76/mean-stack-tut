
import { AccountRepository } from './contracts/AccountRepository'
import { AuthenticationController } from './controller/AuthenticationController'
import { InMemoryAccountRepository } from './frameworks/InMemoryAccountRepository'
import { Server } from 'typescript-rest'
import express from 'express'
import http from 'http'

export default [
  { bind: AccountRepository, to: InMemoryAccountRepository }
]

export class AuthServer {
  public PORT: number = 3000;

  private readonly app: express.Application;
  private server: http.Server = null;

  constructor () {
    this.app = express()
    Server.buildServices(this.app, AuthenticationController)
  }

  /**
   * Start the server
   */
  public async start () {
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, () => {
        console.log(`Listening to http://127.0.0.1:${this.PORT}`)
        return resolve()
      })
      this.server.on('error', function (err) {
        console.error(err)
      })
    })
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop (): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true)
        })
      } else {
        return resolve(true)
      }
    })
  }
}
