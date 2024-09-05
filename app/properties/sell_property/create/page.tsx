import Form from '@/app/api/upload/create-form';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';

export default async function Page() {
  
 
  return (
    <main className = "min-h-screen bg-gray-100 ">
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