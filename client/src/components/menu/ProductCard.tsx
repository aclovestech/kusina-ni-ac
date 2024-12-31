// Imports
import { Link } from '@tanstack/react-router';

export function ProductCard({ data }: { data: ProductCardProps }) {
  return (
    <div className="card bg-base-300 shadow-xl">
      <figure>
        <img src={data.imageURL} alt="" />
      </figure>
      <div className="card-body">
        <div className="badge badge-outline">{data.category}</div>
        <h2 className="card-title mt-3">{data.name}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-outline mt-4" to={data.linkTo}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export type ProductCardProps = {
  imageURL: string;
  name: string;
  description: string;
  category: string;
  linkTo: string;
};
