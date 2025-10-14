
import Form from '@/app/generateSignUpCode/generate/invite-form';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';

export default async function Page() {
    
  return (
    <main className = "min-h-screen mt-12 bg-gray-100 ">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invites', href: '/generateSignUpCode' },
          {
            label: 'Send an Invite',
            href: '/generateSignUpCode',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}