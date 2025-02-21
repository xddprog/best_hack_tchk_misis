import { login } from "@/entities/auth/libs/authService";
import { IAuthResponse, ILoginRequest } from "@/entities/auth/types/types";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (requestData: ILoginRequest) => login(requestData),
    onSuccess: (data: IAuthResponse) => {
      tokenService.setAccessToken(data.tokens.access_token);
      tokenService.setRefreshToken(data.tokens.refresh_token);
      navigate(ERouteNames.DASHBOARD_ROUTE, { replace: true });
      toast.success("Успешный вход, Егор!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: () =>
      toast.error("Что-то пошло не так...", { position: "top-center" }),
  });

  const handleChangeValues = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLoginValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(loginValues);
    setLoginValues({ email: "", password: "" });
  };

  return {
    loginValues,
    onSubmit,
    handleChangeValues,
  };
};
