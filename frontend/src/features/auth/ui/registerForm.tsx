import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "react-router-dom";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  const { registerValues, onSubmit, handleChangeValues } = useRegister();

  return (
    <Form
      className="w-full max-w-md flex flex-col gap-4 p-7 border-gray-500 rounded-2xl"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl text-center w-full mb-1">Регистрация</h1>
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={registerValues.email}
        onChange={handleChangeValues}
      />
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
        value={registerValues.username}
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
        value={registerValues.password}
        onChange={handleChangeValues}
      />
      <div className="w-full mt-4">
        <Button color="primary" type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </div>
      <div className="flex justify-center w-full mt-3">
        Есть аккаунт?
        <Link
          to={ERouteNames.LOGIN_ROUTE}
          className="text-blue-400 cursor-pointer pl-1"
        >
          Войти
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
