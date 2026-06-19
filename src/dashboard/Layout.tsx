import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar/Sidebar";
import { ThemeProvider } from "./theme/Theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {/* <Outlet/> */}
        </main>
        <SidebarInset className="p-5">{children}</SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
