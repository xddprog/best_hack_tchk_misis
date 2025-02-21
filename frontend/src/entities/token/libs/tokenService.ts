import { ETokenKeys } from "./utils/tokenKeys";

class TokenService {
  public deleteAccessToken() {
    localStorage.removeItem(ETokenKeys.ACCESS);
  }

  public getAccessToken() {
    return localStorage.getItem(ETokenKeys.ACCESS);
  }
  public setAccessToken(value: string) {
    return localStorage.setItem(ETokenKeys.ACCESS, value);
  }
}
export default new TokenService();
