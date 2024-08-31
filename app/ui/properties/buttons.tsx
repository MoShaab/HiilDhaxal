import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteListing } from '@/app/lib/actions';
import { auth } from "@/auth"


export function CreateListing() {
  return (
    <Link
      href="/properties/sell_property/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Listing</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export async function UpdateListing({ id }: { id: string }) {
  const session = await auth();

  // Only render the Update button if the user is logged in
  if (!session) return null;

  return (
    <Link
      href={`/properties/${id}/edit`}
      className="rounded-md border p-2 hover:bg-black bg-gray-700 "
    >
      <span>Update Listing</span>
      <PencilIcon className="w-6 ml-8" />
    </Link>
  );
}

export async function DeleteListing({ id }: { id: string }) {
  const session = await auth();
  const deleteListingWithId = deleteListing.bind(null, id);

  // Only render the Delete button if the user is logged in
  if (!session) return null;

  return (
    <form action={deleteListingWithId}>
      <button className="rounded-md border p-2 hover:bg-black bg-gray-700 ">
        <span>Delete Listing</span>
        <TrashIcon className="w-6 ml-8" />
      </button>
    </form>
  );
}
