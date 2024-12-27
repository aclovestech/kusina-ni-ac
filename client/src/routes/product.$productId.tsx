import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  component: ProductDetail,
})

function ProductDetail() {
  return <div>Hello "/product"!</div>
}
