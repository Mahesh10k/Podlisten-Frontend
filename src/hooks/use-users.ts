import { getUsers, loginUser, registerUser } from "@/store/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: (body: unknown) => registerUser(body),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      }),
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: (body: unknown) => loginUser(body),
    onSuccess: (data) => {
      return data;
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      }),
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  });
};
