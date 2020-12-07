
import { Account } from '../entities/Account'

export abstract class AccountRepository {
    abstract getByUsernameAndPassword(username: string, password: string): Promise<Account>
    abstract add(account: Account): Promise<Account>;
}
