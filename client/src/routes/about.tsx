import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <>
      <div className="m-4">
        <h2 className="text-center text-2xl font-extrabold">About</h2>
        <div className="divider"></div>
        <div className="mt-2 flex flex-col gap-2 p-2">
          <h3 className="text-xl font-extrabold">Our Story</h3>
          <p className="text-neutral-content">
            At Kusina Ni AC, we believe that food is more than just sustenance;
            it’s a celebration of culture, family, and tradition. Founded by
            Allain Carl Mojado, our journey began in the heart of the
            Philippines, where the aroma of home-cooked meals filled our
            kitchen. Inspired by cherished family recipes passed down through
            generations, we aim to bring the authentic flavors of Filipino
            cuisine to your table.
          </p>
          <div className="divider my-0"></div>
          <h2 className="text-xl font-extrabold">Our Mission</h2>
          <p className="text-neutral-content">
            Our mission is to share the rich culinary heritage of the
            Philippines with everyone. We are dedicated to using only the
            freshest, high-quality ingredients to create dishes that not only
            satisfy your hunger but also evoke memories of home and warmth. At
            Kusina Ni AC, we strive to make every meal a delightful experience
            that connects you to the vibrant culture of the Philippines.
          </p>
          <div className="divider my-0"></div>
          <h2 className="text-xl font-extrabold">Our Values</h2>
          <ul className="text-neutral-content">
            <li>
              <span className="font-bold">Authenticity</span>: We honor
              traditional recipes and cooking methods to deliver genuine
              Filipino flavors.
            </li>
            <li>
              <span className="font-bold">Quality</span>: We source our
              ingredients from local suppliers who share our commitment to
              freshness and sustainability.
            </li>
            <li>
              <span className="font-bold">Community</span>: We believe in giving
              back. A portion of our proceeds supports local charities and
              initiatives that uplift our community.
            </li>
          </ul>
          <div className="divider my-0"></div>
          <h2 className="text-xl font-extrabold">Join Us</h2>
          <p className="text-neutral-content">
            Whether you're reminiscing about home or discovering Filipino
            cuisine for the first time, we invite you to join us on this
            culinary journey. Experience the warmth of Filipino hospitality at
            Kusina Ni AC—where every dish tells a story.
          </p>
          <div className="divider my-0"></div>
          <h2 className="text-xl font-extrabold">Connect With Us</h2>
          <p className="text-neutral-content">
            We love hearing from our customers! Follow us on{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Instagram
            </a>{' '}
            and{' '}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Facebook
            </a>{' '}
            to share your experiences or ask any questions. Your feedback helps
            us grow and serve you better!
          </p>
        </div>
      </div>
    </>
  );
}
