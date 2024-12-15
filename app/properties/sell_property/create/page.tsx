import Form from '@/app/api/upload/create-form';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export default async function Page() {


  
 
  return (
    
    <main className = "min-h-screen bg-gray-100 ">
              <form
        action={async () => {
            'use server';
            await signOut();
        }}
      >
        <button className="flex h-[35px] md:h-[40px] items-center justify-center gap-2 rounded-md bg-gray-400 p-3 text-sm font-small hover:bg-sky-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Listings', href: '/properties/sell_property/create' },
          {
            label: 'Create Listings',
            href: '/properties/sell_property/create',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}