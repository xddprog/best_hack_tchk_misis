import { axiosAuth, axiosNoAuth } from "@/shared/api/baseQueryInstance";
import {
  IAuthResponse,
  ILoginRequest,
  IRefreshTokenRequest,
  IRegisterRequest,
} from "../types/types";
import { EAuthEndpoints } from "./utils/constants";
import tokenService from "@/entities/token/libs/tokenService";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async login(requestBody: ILoginRequest): Promise<IAuthResponse> {
    const { data } = await axiosNoAuth.post<IAuthResponse>(
      EAuthEndpoints.LOGIN,
      {
        ...requestBody,
      }
    );

    return data;
  }

  public async refreshToken(): Promise<IAuthResponse> {
    const request: IRefreshTokenRequest = {
      refresh_token: tokenService.getRefreshToken() ?? "",
    };
    const { data } = await axiosAuth.post<IAuthResponse>(
      EAuthEndpoints.REFRESH,
      {
        ...request,
      }
    );

    return data;
  }

  public async register(requestBody: IRegisterRequest): Promise<IAuthResponse> {
    const { data } = await axiosNoAuth.post<IAuthResponse>(
      EAuthEndpoints.REGISTER,
      {
        ...requestBody,
      }
    );

    return data;
  }
}

export const { login, register, refreshToken } = AuthService.getInstance();
