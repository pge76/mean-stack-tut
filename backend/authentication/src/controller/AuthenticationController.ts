import { Errors, POST, Path } from 'typescript-rest'
import { Credential } from '../domain/Credential'
import { Inject } from 'typescript-ioc'
import { LoginUser } from '../use-cases/LoginUser'
import { apiversion } from '../env'

@Path(apiversion + '/login')
export class AuthenticationController {
  @Inject
  loginUser: LoginUser;

  constructor (loginUser: LoginUser) {
    this.loginUser = loginUser
  }

  @POST
  async doLoginUser (loginCredential: Credential): Promise<string> {
    console.log(loginCredential.email + ' ' + loginCredential.password)
    try {
      const result: string = await this.loginUser.execute(loginCredential)
      return result
    } catch (e) {
      throw new Errors.UnauthorizedError('Wrong Username and/or Password')
    }
  }
}
