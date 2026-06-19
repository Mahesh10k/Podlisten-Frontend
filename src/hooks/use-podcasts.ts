import { deletePodcast, getPodcasts, uploadPodcast } from "@/store/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useGetPodcasts = () => {
  return useQuery({
    queryKey: ["get-podcasts"],
    queryFn: getPodcasts,
  });
};

export const useUploadPodcast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPodcast,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-podcasts"],
      }),
  });
};

export const useDeletePodcast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePodcast,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-podcasts"],
      }),
  });
};


