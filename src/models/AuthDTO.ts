import AuthUser from "./AuthUser";

export default class AuthDto {
  user!: AuthUser;
  accessToken!: string;
  tokenType!: string;
  expiresIn!: number;

  constructor(jsonObj?: AuthDto) {
      if (jsonObj) {
          this.user = new AuthUser(jsonObj.user);
          this.accessToken = jsonObj.accessToken;
          this.tokenType = jsonObj.tokenType;
          this.expiresIn = jsonObj.expiresIn;
      }
  }
}
