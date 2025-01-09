import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addresses/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/addresses/new"!</div>
}
