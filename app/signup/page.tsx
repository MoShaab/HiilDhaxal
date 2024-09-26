import Form from '@/app/api/upload/signUp-form';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';

export default async function Page() {
  
 
  return (
    <main className = "min-h-screen bg-gray-100 ">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Accounts', href: '/signup' },
          {
            label: 'Create Account',
            href: '/signup',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}