import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start"

import { auth as getAuth } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import appCss from "../styles.css?url"
import type { QueryClient } from "@tanstack/react-query"
import type { ConvexReactClient } from "convex/react"
import type { ConvexQueryClient } from "@convex-dev/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await getAuth()
  const token = await auth.getToken({ template: "convex" })

  return {
    userId: auth.userId,
    token,
  }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchClerkAuth()
    const { userId, token } = auth

    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }

    return {
      userId,
      token,
    }
  },
  // errorComponent: (props) => {
  //   return (
  //     <RootDocument>
  //       <DefaultCatchBoundary {...props} />
  //     </RootDocument>
  //   )
  // },
  // notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        <TooltipProvider>{children}</TooltipProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
