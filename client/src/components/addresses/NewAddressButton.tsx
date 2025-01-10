// Imports
import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export function NewAddressButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate({ to: '/addresses/new' });
  }

  return (
    <div className="card mx-auto mb-4 w-full max-w-xs bg-primary text-primary-content">
      <div className="card-body p-6">
        <div onClick={handleClick}>
          <div className="flex flex-row items-center justify-center gap-2">
            <Plus className="inline-block" /> Add a new address
          </div>
        </div>
      </div>
    </div>
  );
}
