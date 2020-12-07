import { POST, Path } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import { LoginUser } from '../use-cases/LoginUser'
import { apiversion } from '../env'
class LoginParam {
  user: string
  pass: string
}

@Path(apiversion + '/login')
export class AuthenticationController {
  @Inject
  loginUser: LoginUser;

  constructor (loginUser: LoginUser) {
    this.loginUser = loginUser
  }

  @POST
  async doLoginUser (loginParam: LoginParam): Promise<string> {
    console.log(loginParam.user + ' ' + loginParam.pass)
    return await this.loginUser.execute(loginParam.user, loginParam.pass)
  }
}
