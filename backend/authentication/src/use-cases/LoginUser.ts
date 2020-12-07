/* eslint-disable space-before-function-paren */
import { Account } from '../entities/Account'
import { InMemoryAccountRepository } from '../frameworks/InMemoryAccountRepository'
import { Inject } from 'typescript-ioc'

export class LoginUser {
  accountRepository: InMemoryAccountRepository;

  constructor(@Inject accountRepository: InMemoryAccountRepository) {
    this.accountRepository = accountRepository
  }

  async execute (username: string, password: string): Promise<string> {
    console.log('execute: ' + username + ' ' + password)
    const account: Account = await this.accountRepository.getByUsernameAndPassword(username, password)
    return new Promise<string>((resolve, reject) => {
      if (account) {
        resolve('account logged in')
      } else {
        reject(new Error('login failed'))
      }
    })
  }
}
