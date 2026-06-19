import { Home, Podcast, Upload, Settings, User, Heart } from "lucide-react";
import Logo from "../../assets/Logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { ModeToggle } from "../theme/ModeToggle";
import { useUserStore } from "@/store/store";

const sections = [
  {
    name: "Home",
    icon: Home,
    url: "/dashboard",
    roles: ["user", "admin"],
  },
  {
    name: "Podcasts",
    icon: Podcast,
    url: "/dashboard/podcasts",
    roles: ["user", "admin"],
  },
  {
    name: "Upload",
    icon: Upload,
    url: "/dashboard/upload",
    roles: ["admin"],
  },
  {
    name: "Favourites",
    icon: Heart,
    url: "/dashboard/favourites",
    roles: ["user", "admin"],
  },
  {
    name: "Users",
    icon: User,
    url: "/dashboard/users",
    roles: ["admin"],
  },
  {
    name: "Settings",
    icon: Settings,
    url: "/dashboard/settings",
    roles: ["user", "admin"],
  },
];

export function AppSidebar() {
  const { name, role } = useUserStore();

  return (
    <Sidebar className="border-r bg-sidebar">
      {/* Logo */}
      <SidebarHeader className="border-b p-6">
        <div className="flex h-18 w-full items-center justify-center rounded-xl text-white font-bold text-lg">
          <img src={Logo} alt="logo" />
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="gap-4">
            {sections
              .filter((section) => section.roles.includes(role))
              .map((section) => (
                <SidebarMenuItem key={section.name}>
                  <SidebarMenuButton asChild>
                    <NavLink to={section.url}>
                      <section.icon className="h-5 w-5" />
                      <span>{section.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User size={18} />
          </div>

          <div className="flex-1">
            <p className="font-medium">{name}</p>

            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-3">
          <span className="text-sm font-medium">Theme</span>

          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
