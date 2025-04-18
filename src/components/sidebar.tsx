import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavItemComponent } from "./nav-item";
import { NavUser } from "./nav-user";
import { navigationData } from "@/data/navigation";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeftToLine } from "lucide-react";

export function AppSidebar() {
  const navigation = navigationData;
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Company Logo */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between w-full">
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-primary-foreground">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Acme Inc</span>
                  <span className="text-xs text-muted-foreground">Dashboard</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <ArrowLeftToLine />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <NavItemComponent key={item.id} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {/* User Profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser
              user={{
                name: "John Doe",
                role: "Admin",
                avatar: "/vite.svg",
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
