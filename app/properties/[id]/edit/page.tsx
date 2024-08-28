import Form from '@/app/ui/properties/edit-form';
import Breadcrumbs from '@/app/ui/properties/breadcrumbs';
import { fetchPropertyById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const listings  = await fetchPropertyById(id);
    

    console.log('founds:', listings);
    

    
  
    return (
        
        <main className="w-full min-h-screen bg-gray-400">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Listings', href: '/properties' },
                    {
                        label: 'Edit Listing',
                        href: `/properties/${id}/edit`,
                        active: true,
                    },
                ]}
            />
        
            <Form listings={listings} />
        </main>
    );
}
