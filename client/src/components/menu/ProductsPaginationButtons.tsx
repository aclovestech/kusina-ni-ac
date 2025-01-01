// Imports
import { Products } from '../../api';

export function ProductsPaginationButtons({
  products,
  page,
  setPage,
}: ProductsPaginationButtonsProps) {
  function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const page = parseInt(event.target.getAttribute('aria-label') as string);
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return Array.from({ length: products?.totalPages ?? 0 }, (_, index) => (
    <input
      key={index}
      type="radio"
      className="btn btn-square join-item"
      name="options"
      aria-label={(index + 1).toString()}
      defaultChecked={page === index + 1}
      onChange={handlePageChange}
    />
  ));
}

type ProductsPaginationButtonsProps = {
  products: Products | undefined;
  page: number;
  setPage: (page: number) => void;
};
