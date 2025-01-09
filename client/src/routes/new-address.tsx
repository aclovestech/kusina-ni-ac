import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-address')({
  component: NewAddress,
})

function NewAddress() {
  return (
    <>
      <div></div>
    </>
  )
}
