import { ETokenKeys } from "./utils/tokenKeys";

class TokenService {
  public deleteAccessToken() {
    localStorage.removeItem(ETokenKeys.ACCESS);
  }

  public deleteRefreshToken() {
    localStorage.removeItem(ETokenKeys.REFRESH);
  }

  public getAccessToken() {
    return localStorage.getItem(ETokenKeys.ACCESS);
  }

  public getRefreshToken() {
    return localStorage.getItem(ETokenKeys.REFRESH);
  }

  public setRefreshToken(value: string) {
    localStorage.setItem(ETokenKeys.REFRESH, value);
  }

  public setAccessToken(value: string) {
    localStorage.setItem(ETokenKeys.ACCESS, value);
  }
}
export default new TokenService();
