// Imports
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';
import { Header } from '../components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>404</div>,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 300000, refetchOnWindowFocus: false },
  },
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
