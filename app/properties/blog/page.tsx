import Form from '@/app/api/upload/create-blog';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';

export default async function Page() {
  
 
  return (
    <main className = "min-h-screen bg-gray-100 ">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Listings', href: '/properties/blog' },
          {
            label: 'Create Listings',
            href: '/properties/blog',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}