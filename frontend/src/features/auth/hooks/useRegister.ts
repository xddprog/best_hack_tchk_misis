import { register } from "@/entities/auth/libs/authService";
import { IAuthResponse, IRegisterRequest } from "@/entities/auth/types/types";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (requestData: IRegisterRequest) => register(requestData),
    onSuccess: (data: IAuthResponse) => {
      tokenService.setAccessToken(data.tokens.access_token);
      tokenService.setRefreshToken(data.tokens.refresh_token);
      navigate(ERouteNames.DASHBOARD_ROUTE, { replace: true });
      toast.success("Успешная регистрация, Егор!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: () =>
      toast.error("Что-то пошло не так...", { position: "top-center" }),
  });

  const handleChangeValues = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRegisterValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(registerValues);

    setRegisterValues({ email: "", password: "", username: "" });
  };

  return {
    registerValues,
    onSubmit,
    handleChangeValues,
  };
};
