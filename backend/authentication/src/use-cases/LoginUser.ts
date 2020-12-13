import { Account } from '../domain/Account'
import { AccountRepository } from '../contracts/AccountRepository'
import { Credential } from '../domain/Credential'
import { Inject } from 'typescript-ioc'
import { sign } from 'jsonwebtoken'

export class LoginUser {
  accountRepository: AccountRepository;

  exipireTime = 24 * 60 * 60; // 1 day
  SECRET_KEY = 'thisisasupersecretkeyforcreatingjwtwebtokens';

  constructor(@Inject accountRepository: AccountRepository) {
    this.accountRepository = accountRepository
  }

  async execute (credential: Credential): Promise<string> {
    const account: Account = await this.accountRepository.getByCredentials(credential)
    return new Promise<string>((resolve, reject) => {
      if (account) {
        const accessToken = sign({
          id: account._id
        }, this.SECRET_KEY, { expiresIn: this.exipireTime })

        resolve((JSON.stringify({
          _id: account._id,
          user: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          access_token: accessToken,
          expiresInSeconds: this.exipireTime
        })))
      } else {
        reject(new Error('login failed'))
      }
    })
  }
}
