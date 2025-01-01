import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu/product/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/menu/product/$productId"!</div>
}
