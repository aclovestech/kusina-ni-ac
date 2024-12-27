// Imports
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';
import Header from '../components/layout/Header/Header';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>404</div>,
});

function Root() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'coffee');
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster
        className="md:![--width:150px]"
        duration={10000}
        position="bottom-center"
        toastOptions={{
          classNames: {
            success: 'bg-success',
            error: 'bg-error',
            info: 'bg-info',
            warning: 'bg-warning',
          },
          style: { justifyContent: 'center' },
        }}
      />
      <TanStackRouterDevtools />
    </>
  );
}
