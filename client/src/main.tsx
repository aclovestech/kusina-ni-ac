// Imports
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  createRouteMask,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Set up the route mask/s
const checkoutMask = createRouteMask({
  routeTree,
  from: '/checkout',
  to: '/cart/checkout',
});
const newAddressMask = createRouteMask({
  routeTree,
  from: '/new-address',
  to: '/addresses/new',
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultStaleTime: 5000,
  routeMasks: [checkoutMask, newAddressMask],
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

// Set theme
document.documentElement.setAttribute('data-theme', 'coffee');
