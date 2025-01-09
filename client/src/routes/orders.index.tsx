import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders/')({
  component: Orders,
})

function Orders() {
  return <div>Hello "/orders"!</div>
}
