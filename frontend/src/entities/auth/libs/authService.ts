import { ILoginRequest, IRegisterRequest } from "../types/types";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async login(requestBody: ILoginRequest) {
    return new Promise((resolve) => resolve(requestBody));
  }

  public async register(requestBody: IRegisterRequest) {
    console.log(requestBody);

    return new Promise((resolve) => resolve(requestBody));
  }
}

export const { login, register } = AuthService.getInstance();
