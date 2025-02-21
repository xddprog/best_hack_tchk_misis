export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface IRefreshTokenRequest {
  refresh_token: string;
}

export interface IAuthResponse {
  user: {
    username: string;
    email: string;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
