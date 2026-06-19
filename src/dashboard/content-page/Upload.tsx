import { useState } from "react";
import {
  UploadCloud,
  Music2,
  ImageIcon,
  Headphones,
  // Badge,
  PlayCircle,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUploadPodcast,
  useGetPodcasts,
  useDeletePodcast,
} from "@/hooks/use-podcasts";
import { useUserStore } from "@/store/store";
import { toast } from "sonner";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnail: null as File | null,
    file: null as File | null,
  });

  const uploadPodcastMutation = useUploadPodcast();
  const { email } = useUserStore();

  const { data, isPending } = useGetPodcasts();
  const podcastDeleteMutation = useDeletePodcast();

  const myPodcasts = data?.filter((podcast) => podcast.email === email) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await uploadPodcastMutation.mutateAsync({
        ...formData,
        email,
      });
      console.log("response", response)
      toast.success(response.message);
      setFormData({
        title: "",
        category: "",
        thumbnail: null as File | null,
        file: null as File | null,
      });
    } catch (error) {
      console.error(error);
      // toast.error(error.message)
    }
  };

  const handleDelete = async (id: string) => {
    const response = await podcastDeleteMutation.mutateAsync(id);
    toast.success(response.message);
  };
  return (
    <>
      <div className="mx-auto max-w-5xl p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Upload Podcast</CardTitle>

            <CardDescription>Share your voice with the world.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label>Podcast Title</Label>

                <Input
                  placeholder="Enter podcast title"
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>

                <Select
                  required
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>

                    <SelectItem value="Business">Business</SelectItem>

                    <SelectItem value="Education">Education</SelectItem>

                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>

                    <SelectItem value="Comedy">Comedy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Thumbnail</Label>

                  <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:bg-muted/50">
                    <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />

                    <span className="text-sm text-muted-foreground">
                      Upload Thumbnail
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          thumbnail: e.target.files?.[0] || null,
                        })
                      }
                    />
                  </label>
                </div>

                {/* Audio */}
                <div className="space-y-2">
                  <Label>Podcast Audio</Label>

                  <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:bg-muted/50">
                    <Music2 className="mb-2 h-8 w-8 text-muted-foreground" />

                    <span className="text-sm text-muted-foreground">
                      Upload Audio File
                    </span>

                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          file: e.target.files?.[0] || null,
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Preview */}
              {formData.thumbnail && (
                <div className="rounded-xl border p-4">
                  <p className="mb-2 text-sm font-medium">Thumbnail Preview</p>

                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Upload Button */}
              <Button type="submit" size="lg" className="w-full">
                <UploadCloud className="mr-2 h-5 w-5" />
                Upload Podcast
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {!isPending && myPodcasts.length ? (
        <>
          <h1 className="text-3xl font-bold m-1.5 mb-3.5">Uploaded Podcasts</h1>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {myPodcasts.map((podcast) => (
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
                    {/* <Badge>{podcast?.category}</Badge> */}

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

                <CardFooter className="flex gap-2 justify-center">
                  {/* <Button className="flex-1">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Play Now
                </Button> */}
                  <div className="text-sm">Delete</div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(podcast._id)}
                  >
                    <Trash />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="m-auto"> You didn't uploaded any podcasts</div>
      )}
    </>
  );
};

export default Upload;
