'use strict'

import { AccountRepository } from './contracts/AccountRepository'
import { Container } from 'typescript-ioc'
import { MongoDbAccountRepository } from './frameworks/MongoDbAccountRepository'
import { start } from './start'

Container.bind(AccountRepository).to(MongoDbAccountRepository)

start()
  .catch((err) => {
    console.error(`Error starting server: ${err.message}`)
    process.exit(-1)
  })
