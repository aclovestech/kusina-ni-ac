// Imports
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { MenuCategories } from '../components'

export const Route = createFileRoute('/menu')({
  component: Menu,
})

function Menu() {
  return (
    <>
      <MenuCategories />
      <div className="divider my-0"></div>
      <Outlet />
    </>
  )
}
