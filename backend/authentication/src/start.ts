'use strict'

import { AuthServer } from './auth-server'
import { MongoConnector } from './mongo-connector'

export async function start (): Promise<void> {
  const mongoConnector = new MongoConnector()
  const authServer = new AuthServer()

  console.log('start auth server')
  await authServer.start()

  console.log('start mongodb connector')
  await mongoConnector.connect()

  const graceful = async () => {
    await authServer.stop()
    await mongoConnector.disconnect()
    process.exit(0)
  }

  // Stop graceful
  process.on('SIGTERM', graceful)
  process.on('SIGINT', graceful)
}
