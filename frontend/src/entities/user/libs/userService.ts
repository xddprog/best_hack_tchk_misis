import { axiosAuth } from "@/shared/api/baseQueryInstance";
import { IUserResponse } from "../types/types";
import { EUserEndpoints } from "../utils/constants";

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async getCurrentUser(): Promise<IUserResponse> {
    const { data } = await axiosAuth.get<IUserResponse>(
      EUserEndpoints.GET_CURRENT
    );

    return data;
  }
}

export const { getCurrentUser } = UserService.getInstance();
