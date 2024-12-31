// Imports
import { Link, useNavigate } from '@tanstack/react-router';
import { useGetCategories } from '../../hooks/useProductsHooks';
import { useEffect } from 'react';

export function MenuCategories() {
  const { data, isPending, isError } = useGetCategories();

  function createElements(count: number) {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="btn skeleton"></div>
    ));
  }

  function Skeleton() {
    return <>{createElements(8)}</>;
  }

  function Categories() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate({ to: '/menu/category/all' });
    }, [navigate]);

    return (
      <>
        <Link className="btn btn-outline" from="/menu" to="/menu/category/all">
          All
        </Link>
        {data?.map((category) => {
          return (
            <Link
              key={category.category_id}
              className="btn btn-outline"
              from="/menu"
              to={`/menu/category/${category.category_id}`}
            >
              {category.name}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {isError ? (
        <div className="p-8 text-center">
          Error fetching categories, please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:gap-2">
          {isPending && <Skeleton />}
          {data && <Categories />}
        </div>
      )}
    </>
  );
}
