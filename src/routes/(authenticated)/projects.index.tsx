import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(authenticated)/projects/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/projects/"!</div>
}
