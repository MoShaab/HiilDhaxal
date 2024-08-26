import Link from 'next/link';

export default function Page(){
    return (
        <div className = 'w-full min-h-screen bg-gray-100'>

        <div >
        <p className = 'text-center text-3xl text-blue-700 ' >Successfully Uploaded!</p>;
        </div>

        <Link href = '/properties'>
        <div>
            

        <div className="flex justify-center">
                <div className =  "p-8 mt-20 bg-blue-700 hover:bg-gray-500 text-white font-bold py-2 rounded">  Check the Uploads  </div>
            </div>
        </div>
        </Link>


        </div>



    )
    
    
}