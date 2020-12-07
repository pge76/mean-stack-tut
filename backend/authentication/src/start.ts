'use strict'

import { AuthServer } from './AuthServer'

export async function start (): Promise<void> {
  const authServer = new AuthServer()
  await authServer.start()
  const graceful = async () => {
    await authServer.stop()
    process.exit(0)
  }

  // Stop graceful
  process.on('SIGTERM', graceful)
  process.on('SIGINT', graceful)
}
