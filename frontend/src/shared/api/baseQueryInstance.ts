import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  isAxiosError,
} from "axios";
import { RequestOptions } from "https";
import tokenService from "@/entities/token/libs/tokenService";

export class AxiosClient {
  private baseQueryV1Instance: AxiosInstance;

  constructor(baseURL: string, withAuth = false) {
    const config: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.baseQueryV1Instance = axios.create(config);

    if (withAuth) {
      this.addAuthInterceptor();
      // this.addAuthResponseInterceptor();
    }
  }

  private addAuthInterceptor() {
    this.baseQueryV1Instance.interceptors.request.use((config) => {
      const token = tokenService.getAccessToken();

      if (config && config.headers && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        tokenService.deleteAccessToken();
      }

      return config;
    });
  }

  public addAuthResponseInterceptor() {
    let isRefreshing = false;
    let refreshSubscribers: ((token: string) => void)[] = [];

    this.baseQueryV1Instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing) {
            return new Promise((resolve) => {
              refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.baseQueryV1Instance(originalRequest));
              });
            });
          }

          isRefreshing = true;

          try {
            const { data } = await authService.refreshToken();

            if (!data.access_token) throw new Error("Invalid refresh response");

            tokenService.setAccessToken(data.access_token);
            isRefreshing = false;

            refreshSubscribers.forEach((callback) =>
              callback(data.access_token)
            );
            refreshSubscribers = [];

            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

            return this.baseQueryV1Instance(originalRequest);
          } catch (error) {
            isRefreshing = false;
            refreshSubscribers = [];
            if (isAxiosError(error)) {
              if (error.response?.status === 401) {
                tokenService.deleteAccessToken();
              }
            }

            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private handleError(error: AxiosError<{ message?: string }>): never {
    const message = error.response?.data?.message || error.message || "Error";

    throw new Error(message);
  }

  public async get<T>(
    url: string,
    params: Omit<RequestOptions, "body"> = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.get<T>(url, { params });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.post<T>(
        url,
        data,
        config
      );

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.put<T>(url, data, config);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.patch<T>(
        url,
        data,
        config
      );

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.delete<T>(url, config);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }
}

export const axiosNoAuth = new AxiosClient(import.meta.env.VITE_SERVER_URL);
export const axiosAuth = new AxiosClient(import.meta.env.VITE_SERVER_URL, true);
