import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(public)/sign-in/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/sign-in/"!</div>
}
