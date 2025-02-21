import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ERouteNames } from "@/shared/utils/pathVariables";

const LoginForm = () => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
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
    setLoginValues({ email: "", password: "" });
  };

  return (
    <Form
      className="w-full max-w-md flex flex-col gap-4 p-7 border-gray-500 rounded-2xl"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl text-center w-full mb-1">Вход</h1>
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={loginValues.email}
        onChange={handleChangeValues}
      />
      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={loginValues.password}
        onChange={handleChangeValues}
      />
      <div className="w-full mt-4">
        <Button color="primary" type="submit" className="w-full">
          Войти
        </Button>
      </div>
      <div className="flex justify-center w-full mt-3">
        Нет аккаунта?
        <Link
          to={ERouteNames.REGISTRATION_ROUTE}
          className="text-blue-400 cursor-pointer pl-1"
        >
          Зарегистрироваться
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
