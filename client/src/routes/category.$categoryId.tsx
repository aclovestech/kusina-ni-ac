import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/$categoryId"!</div>
}