import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu/category/all')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/all"!</div>
}
