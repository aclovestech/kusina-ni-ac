// Imports
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function CartItemRemoveButton() {
  const [areYouSure, setAreYouSure] = useState(false);

  function handleRemove() {
    if (areYouSure) {
      // Remove item from cart
    } else {
      setAreYouSure(true);
      setTimeout(() => {
        setAreYouSure(false);
      }, 5000);
    }
  }

  return (
    <div
      className={areYouSure ? 'btn btn-error w-fit' : 'btn btn-outline w-fit'}
      onClick={handleRemove}
    >
      <Trash2 width={16} height={16} />
    </div>
  );
}
