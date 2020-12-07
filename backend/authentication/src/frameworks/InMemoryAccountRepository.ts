import { Account } from '../entities/Account'
import { AccountRepository } from '../contracts/AccountRepository'

export class InMemoryAccountRepository extends AccountRepository {
  accounts: Array<Account>;
  currentId: number;

  constructor () {
    super()
    this.accounts = [new Account('hansi', 'meier'), new Account('klausi', 'mueller')]
    this.currentId = 3
  }

  async getByUsernameAndPassword (username: string, password: string): Promise<Account> {
    const account = (await this.getAll()).find(acc => acc.username === username && acc.password === password)
    return Promise.resolve(account)
  }

  async add (account: Account): Promise<Account> {
    this.currentId++
    account.id = this.currentId
    this.accounts.push(account)
    return Promise.resolve(account)
  }

  async getAll (): Promise<Array<Account>> {
    return Promise.resolve(this.accounts)
  }
}
