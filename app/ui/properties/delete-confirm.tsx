'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useTransition } from 'react';
import { deleteListing } from '@/app/lib/actions';

export function DeleteListing({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    startTransition(() => {
      deleteListing(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md border p-2 hover:bg-black bg-gray-700"
    >
      <span>{isPending ? 'Deleting...' : 'Tuur Boostiga'}</span>
      <TrashIcon className="w-6 ml-8" />
    </button>
  );
}
