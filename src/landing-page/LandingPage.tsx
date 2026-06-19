import {
  PlayCircle,
  ArrowRight,
  Mic2,
  Radio,
  GraduationCap,
  Quote,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import "../App.css";
import { useNavigate } from "react-router-dom";

const reasons = [
  {
    label: "Learn",
    title: "Skip the textbook",
    body: "Hear experts think out loud, in real time, on the topics you actually care about.",
  },
  {
    label: "Unwind",
    title: "Company for the commute",
    body: "Stories, debates and rabbit holes that make the in-between moments worth something.",
  },
  {
    label: "Expand",
    title: "Hear the other side",
    body: "Long-form conversation gives ideas room to breathe — and room to disagree.",
  },
  {
    label: "Connect",
    title: "Closer to people",
    body: "Voices in your ear build empathy in a way headlines and feeds rarely manage.",
  },
];

const features = [
  {
    icon: Radio,
    eyebrow: "Live & on-demand",
    title: "Press play, anywhere",
    description:
      "Thousands of shows, queued instantly and synced across every device you own.",
  },
  {
    icon: Mic2,
    eyebrow: "Curated, not algorithmic noise",
    title: "Shows worth your time",
    description:
      "Editors and listeners surface what's actually good — not just what's loud this week.",
  },
  {
    icon: GraduationCap,
    eyebrow: "Built for going deeper",
    title: "Learn at your pace",
    description:
      "Bookmark moments, slow down dense explanations, and pick up exactly where you left off.",
  },
];

function Waveform({ className = "", barClassName = "", count = 64 }) {
  // Deterministic pseudo-random heights so the waveform looks organic
  // without re-randomizing on every render.
  const heights = Array.from({ length: count }, (_, i) => {
    const a = Math.sin(i * 0.7) * 0.5 + 0.5;
    const b = Math.sin(i * 0.21 + 1.3) * 0.5 + 0.5;
    return 0.15 + (a * 0.65 + b * 0.35) * 0.85;
  });

  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            height: `${Math.round(h * 100)}%`,
            animationDelay: `${i * 35}ms`,
          }}
          className={`flex-1 rounded-full origin-bottom animate-[wave_2.6s_ease-in-out_infinite] ${barClassName}`}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const handleNavigatePodcasts = () => {
    const token = localStorage.getItem("token");
    return token ? navigate("/dashboard/podcasts") : navigate("/login");
  };
  return (
    <div className="bg-[#FBF6EC] text-[#161616] min-h-screen antialiased selection:bg-[#FF7A33]/30 font-[Inter,sans-serif]">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .font-display {
          font-family: 'Fraunces', 'Georgia', serif;
        }
      `}</style>

      {/* NAV */}
      <header className="container mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#161616] flex items-center justify-center">
            <Waveform
              count={4}
              className="h-3.5 w-4"
              barClassName="bg-[#FF7A33]"
            />
          </div>
          <span className="font-display text-xl tracking-tight">PodListen</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#161616]/70">
          <a href="#shows" className="hover:text-[#161616] transition-colors">
            Shows
          </a>
          <a href="#why" className="hover:text-[#161616] transition-colors">
            Why audio
          </a>
          <a href="#start" className="hover:text-[#161616] transition-colors">
            Get started
          </a>
        </nav>
        <Button
          className="bg-[#161616] hover:bg-[#161616]/85 text-[#FBF6EC] rounded-full px-5"
          onClick={handleNavigatePodcasts}
        >
          Sign in
        </Button>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10 pt-10 pb-24 lg:pt-16 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <Badge className="rounded-full bg-[#1F6F66]/10 text-[#1F6F66] border border-[#1F6F66]/20 px-4 py-1.5 text-sm font-medium">
                India's listening room
              </Badge>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.98] tracking-tight">
                Turn the
                <br />
                volume up on
                <br />
                <span className="text-[#FF7A33]">good ideas</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#161616]/65 max-w-xl leading-relaxed font-normal">
                PodListen brings you the conversations worth pausing your day
                for — interviews, stories and deep dives from creators who know
                their craft.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-[#161616] hover:bg-[#161616]/85 text-[#FBF6EC] rounded-full px-7 h-13 text-base"
                  onClick={handleNavigatePodcasts}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start listening free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-7 h-13 text-base border-[#161616]/15 hover:bg-[#161616]/5"
                  onClick={handleNavigatePodcasts}
                >
                  Browse shows
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Signature waveform panel */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#161616] p-8 flex flex-col gap-6 h-72 justify-between">
                <div className="flex items-center justify-between text-[#FBF6EC]/60 text-sm font-medium">
                  <span>Now playing</span>
                  <span>14:02</span>
                </div>
                <Waveform
                  className="h-24"
                  barClassName="bg-gradient-to-t from-[#FF7A33] via-[#FF7A33] to-[#A78BFA]"
                />
                <div>
                  <p className="font-display text-2xl text-[#FBF6EC] leading-snug">
                    "The Long Tail of Curiosity"
                  </p>
                  <p className="text-[#FBF6EC]/50 text-sm mt-1">
                    Ep. 142 — On Thinking Aloud
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="shows" className="border-t border-[#161616]/10">
        <div className="container mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <h2 className="lg:col-span-7 font-display text-4xl sm:text-5xl leading-tight tracking-tight">
              Everything you need, nothing you don't
            </h2>
            <p className="lg:col-span-5 text-lg text-[#161616]/60 leading-relaxed self-end">
              A listening experience built around the show, not around feeds,
              autoplay traps or endless notifications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#161616]/10 rounded-3xl overflow-hidden">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="rounded-none border-none bg-[#FBF6EC] hover:bg-[#161616] transition-colors duration-300 group"
                >
                  <CardContent className="p-10 flex flex-col h-full gap-6">
                    <Icon className="h-7 w-7 text-[#FF7A33] group-hover:text-[#FF7A33] transition-colors" />
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#1F6F66] group-hover:text-[#A78BFA] transition-colors">
                        {feature.eyebrow}
                      </p>
                      <h3 className="font-display text-2xl group-hover:text-[#FBF6EC] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[#161616]/60 group-hover:text-[#FBF6EC]/60 transition-colors leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY PODCASTS */}
      <section id="why" className="bg-[#161616] text-[#FBF6EC]">
        <div className="container mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Badge className="rounded-full bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/25 px-4 py-1.5 text-sm font-medium">
                The power of audio
              </Badge>
              <h2 className="font-display text-4xl sm:text-5xl leading-tight tracking-tight">
                Why millions choose to listen
              </h2>
              <p className="text-lg text-[#FBF6EC]/60 leading-relaxed max-w-md">
                Audio asks for your attention differently — slower, closer, and
                without a screen demanding your eyes too.
              </p>

              <div className="pt-6 flex items-start gap-4">
                <Quote className="h-8 w-8 text-[#FF7A33] shrink-0" />
                <p className="font-display text-xl leading-snug text-[#FBF6EC]/90">
                  Storytelling, self-expansion, and a little wisdom on the way
                  home.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-[#FBF6EC]/10 rounded-3xl overflow-hidden">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-[#161616] p-8 flex flex-col gap-4"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FF7A33]">
                    {reason.label}
                  </span>
                  <h3 className="font-display text-2xl leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-[#FBF6EC]/55 leading-relaxed">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10 py-24">
          <Card className="rounded-[2.5rem] border-none bg-[#FF7A33] overflow-hidden">
            <CardContent className="relative p-12 sm:p-16 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#161616] leading-tight">
                  Your next favorite show is one tap away
                </h2>
                <p className="text-[#161616]/70 text-lg max-w-lg">
                  Free to start, no credit card, no algorithm deciding what
                  matters to you.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-[#161616] hover:bg-[#161616]/85 text-[#FBF6EC] rounded-full px-8 h-14 text-base shrink-0"
                onClick={handleNavigatePodcasts}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Get started free
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#161616]/50">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#161616] flex items-center justify-center">
            <Waveform
              count={4}
              className="h-3 w-3"
              barClassName="bg-[#FF7A33]"
            />
          </div>
          <span className="font-display text-base text-[#161616]">
            PodListen
          </span>
        </div>
        <p>© {new Date().getFullYear()} PodListen. Made for listeners.</p>
      </footer>
    </div>
  );
}
