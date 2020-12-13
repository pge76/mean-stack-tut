import { Account } from '../domain/Account'
import { AccountRepository } from '../contracts/AccountRepository'
import { Credential } from '../domain/Credential'

export class InMemoryAccountRepository extends AccountRepository {
  accounts: Array<Account>;
  currentId: string;

  async getByCredentials (credential: Credential): Promise<Account> {
    const account = (await this.getAll()).find(acc => acc.email === credential.email && acc.password === credential.password)
    return Promise.resolve(account)
  }

  async add (account: Account): Promise<Account> {
    this.currentId = Math.random().toString(36).substring(7);
    account._id = this.currentId
    this.accounts.push(account)
    return Promise.resolve(account)
  }

  async getAll (): Promise<Array<Account>> {
    return Promise.resolve(this.accounts)
  }
}
