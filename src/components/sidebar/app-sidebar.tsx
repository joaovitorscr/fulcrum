import { IconDashboard, IconStackFront } from "@tabler/icons-react"
import { Link, useLocation } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [{ title: "Projects", url: "/projects", icon: IconDashboard }]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-linear-to-br from-primary to-accent p-2 shadow-lg shadow-primary/20">
            <IconStackFront className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Fulcrum
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (item.url !== "/" && location.pathname.startsWith(item.url))

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={() => (
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2"
                        >
                          <item.icon
                            className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
