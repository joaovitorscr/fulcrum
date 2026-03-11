import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { auth } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const authStateFn = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    throw redirect({
      to: "/sign-in",
    })
  }

  return { userId }
})

export const Route = createFileRoute("/(authenticated)")({
  component: PrivateComponent,
  beforeLoad: () => authStateFn(),
  loader: ({ context }) => {
    return { userId: context.userId }
  },
})

function PrivateComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
