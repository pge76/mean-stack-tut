import { Account } from '../domain/Account'
import { Credential } from '../domain/Credential'

export abstract class AccountRepository {
    abstract getByCredentials(credential: Credential): Promise<Account>
    abstract add(account: Account): Promise<Account>;
}
