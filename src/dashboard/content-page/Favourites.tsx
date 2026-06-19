import { Heart, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/store";
import { useDeleteFavourite } from "@/hooks/use-favourites";
import { useGetPodcasts } from "@/hooks/use-podcasts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { PODCAST_API_RESPONSE } from "../constants";

const Favourites = () => {
  const { email, favourites, updateFavourites } = useUserStore();

  const deleteMutation = useDeleteFavourite();
  const { data = [], isPending } = useGetPodcasts();

  const favouritePodcasts = data.filter(
    (podcast: PODCAST_API_RESPONSE) =>
      favourites?.includes(podcast._id)
  );

  const handleDelete = async (podcastId: string) => {
    try {
      const response = await deleteMutation.mutateAsync({
        id: podcastId,
        email,
      });

      updateFavourites(
        favourites.filter((id) => id !== podcastId)
      );

      toast.success(
        response?.message || "Removed from favourites"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove favourite");
    }
  };

  if (isPending) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-muted-foreground">
          Loading favourites...
        </p>
      </div>
    );
  }

  if (!favouritePodcasts.length) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <Heart className="h-16 w-16 text-muted-foreground" />

        <h2 className="text-2xl font-semibold">
          No Favourite Podcasts
        </h2>

        <p className="text-muted-foreground">
          Start adding podcasts to your favourites.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Favourite Podcasts
        </h1>

        <p className="text-muted-foreground">
          Your saved podcast collection
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {favouritePodcasts.map(
          (podcast: PODCAST_API_RESPONSE) => (
            <Card
              key={podcast._id}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                    className="h-full w-full object-cover"
                  />

                  <Badge className="absolute left-3 top-3">
                    {podcast.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold">
                    {podcast.title}
                  </h3>

                  <audio
                    src={podcast.audioUrl}
                    controls
                    className="w-full"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-center">
                <Button
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() =>
                    handleDelete(podcast._id)
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Favourites;