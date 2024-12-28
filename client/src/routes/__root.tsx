// Imports
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';
import Header from '../components/layout/Header/Header';
import { SessionProvider } from '../hooks/SessionProvider';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>404</div>,
});

function Root() {
  return (
    <>
      <SessionProvider>
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
      </SessionProvider>
      <TanStackRouterDevtools />
    </>
  );
}
