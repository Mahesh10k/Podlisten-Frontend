import { TrendingUp, Podcast, Clock, Upload, PlayCircle } from "lucide-react";
import Logo from "../../assets/Logo.png"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const trendingPodcasts = [
  {
    id: 1,
    title: "React Mastery",
    category: "Technology",
  },
  {
    id: 2,
    title: "Startup Stories",
    category: "Business",
  },
  {
    id: 3,
    title: "Healthy Living",
    category: "Lifestyle",
  },
];

const categories = [
  "Technology",
  "Business",
  "Education",
  "Lifestyle",
  "Comedy",
  "Finance",
];

const stats = [
  {
    title: "Podcasts",
    value: "125",
    icon: Podcast,
  },
  {
    title: "Trending",
    value: "18",
    icon: TrendingUp,
  },
  {
    title: "Listening Hours",
    value: "240h",
    icon: Clock,
  },
  {
    title: "Uploads",
    value: "12",
    icon: Upload,
  },
];

const Home = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Hero */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-xl">
        <CardContent className="p-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
              Podcast Platform
            </Badge>

            <h1 className="mb-3 text-4xl font-bold">Welcome to PodListen</h1>

            <p className="text-lg text-white/90">
              Discover, stream, and upload amazing podcasts from creators around
              the world.
            </p>

            <Button
              size="lg"
              className="mt-6 bg-white text-black hover:bg-white/90"
              onClick={() => (location.href = "/dashboard/podcasts")}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Explore Podcasts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{stat.title}</CardDescription>

                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>

            <CardContent>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Browse podcasts by category</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer px-4 py-2 text-sm transition hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Podcasts */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Trending Podcasts </h2>

            <p className="text-muted-foreground">
              Most popular podcasts this week
            </p>
          </div>

          <Button variant="outline" onClick={()=>location.href = "/dashboard/podcasts"}>View All</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trendingPodcasts.map((podcast) => (
            <Card
              key={podcast.id}
              className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="flex h-44 items-center justify-center rounded-t-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-6xl">
                  <img src={Logo} alt="" />
                </div>

                <div className="p-5">
                  <Badge className="mb-3">{podcast.category}</Badge>

                  <h3 className="text-lg font-semibold">{podcast.title}</h3>
{/* 
                  <Button className="mt-4 w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Play Now
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Played</CardTitle>
          <CardDescription>Continue where you left off</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>React Mastery Podcast</span>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span>Business Growth Secrets</span>
            <span className="text-sm text-muted-foreground">Yesterday</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span>Fitness & Mindset</span>
            <span className="text-sm text-muted-foreground">3 days ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
