import { useGetPodcasts } from "@/hooks/use-podcasts";
import type { PODCAST_API_RESPONSE } from "../constants";
import { Heart } from "lucide-react";

import { PlayCircle, Headphones } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback } from "react";
import { useUserStore } from "@/store/store";
import { useAddFavourite } from "@/hooks/use-favourites";
import { toast } from "sonner";

const Podcast = () => {
  const { data, isPending } = useGetPodcasts();
  const { email, updateFavourites } = useUserStore();
  const addFavouritesMutation = useAddFavourite();

  const handleFavourites = useCallback(
    async (id: string) => {
      const response = await addFavouritesMutation.mutateAsync({ id, email });
      updateFavourites(response.favourites);
      toast.success(response.message);
    },
    [addFavouritesMutation, updateFavourites, email],
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Podcasts</h1>

          <p className="text-muted-foreground">
            Discover and listen to amazing podcasts
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item}>
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Podcasts */}
      {!isPending && data && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((podcast: PODCAST_API_RESPONSE) => (
            <Card
              key={podcast._id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-3.5"
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <Button
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full shadow-lg"
                  >
                    <PlayCircle className="h-5 w-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <Badge variant="secondary">{podcast.category}</Badge>

                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {podcast.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Headphones className="h-4 w-4" />
                    Podcast Episode
                  </div>

                  <audio src={podcast.audioUrl} controls className="w-full" />
                </div>
              </CardContent>

              <CardFooter
                onClick={() => handleFavourites(podcast._id)}
                className="flex gap-2 justify-center hover:cursor-auto"
              >
                {/* <Button className="flex-1">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Play Now
                </Button> */}
                Add to Favourite
                <Button variant="outline" size="icon">
                  <Heart />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Podcast;
