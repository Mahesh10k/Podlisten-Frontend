import { addFavourites, deleteFavourite } from "@/store/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FavouritePayload = {
  id: string;
  email: string;
};

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-favourites"],
    mutationFn: ({ id, email }: FavouritePayload) => addFavourites(id, email),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-podcasts"],
      });
    },
  });
};

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-favourites"],
    mutationFn: ({ id, email }: FavouritePayload) => deleteFavourite(id, email),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-podcasts"],
      });
    },
  });
};
