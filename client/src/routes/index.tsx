// Imports
import { createFileRoute } from '@tanstack/react-router';
import background from '../assets/home-hero.jpeg';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-75"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Taste the Heart of the Philippines
            </h1>
            <p className="mb-5">
              Experience the rich culinary traditions of the Philippines with
              every bite.
            </p>
            <Link to="/menu" className="btn btn-primary">
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
