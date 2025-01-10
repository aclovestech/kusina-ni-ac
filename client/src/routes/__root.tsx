// Imports
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { Header } from '../components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 3600000, refetchOnWindowFocus: false },
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
        duration={5000}
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function NotFound() {
  return (
    <div className="m-12 flex flex-col gap-4 text-center">
      <h2 className="text-2xl">Oops! Page Not Found</h2>
      <p className="text-xl">
        We can't seem to find the page you're looking for.
      </p>
      <Link to="/" className="btn btn-primary w-fit self-center">
        Back to Home
      </Link>
    </div>
  );
}
