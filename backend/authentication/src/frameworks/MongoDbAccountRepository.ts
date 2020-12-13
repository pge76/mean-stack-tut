import { Account } from '../domain/Account'
import { AccountRepository } from '../contracts/AccountRepository'
import { Credential } from '../domain/Credential'

export class MongoDbAccountRepository extends AccountRepository {
  async getByCredentials (credential: Credential): Promise<Account> {
    return Promise.resolve(new Account());
  }

  async add (account: Account): Promise<Account> {
    return Promise.resolve(new Account());
  }

  async getAll (): Promise<Array<Account>> {
    return Promise.resolve([new Account()]);
  }
}
