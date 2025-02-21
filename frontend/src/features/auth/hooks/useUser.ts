import { getCurrentUser } from "@/entities/user/libs/userService";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  return {
    data,
  };
};
