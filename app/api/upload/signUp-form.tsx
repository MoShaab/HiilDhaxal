
import Link from 'next/link';
import {
    AtSymbolIcon,
    UserGroupIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { signUpUser } from '@/app/lib/actions';

export default function Form() {
  return (
    <form action={signUpUser} className="max-w-md mx-auto text-black">
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Username */}
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-lg text-3xl font-medium">
          Username
        </label>
        <div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-lg text-3xl outline-2 placeholder:text-gray-500"
          />
          <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>
  
      {/* Email*/}
      
      <label
              className="mb-3 mt-5 block text-lg font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-lg text-3xl text-black outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          
  
      {/* Password */}
      <label
              className="mb-3 mt-5 block text-lg font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-lg 3xl text-black outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            <div className = 'relative'>

           

            <label
            
            className="mb-3 mt-5 block text-lg font-medium text-gray-900"
              htmlFor="accessCode">
                Invite Code
                </label>
                <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-lg 3xl text-black outline-2 placeholder:text-gray-500"
                type="text" 
                id = "inviteCode"
                name="inviteCode" 
                required
                placeholder="Enter code sent to your email"
                 />
              
             </div>
    
  
      
          
  
      {/* Profile */}
      {/* <div className="mb-4">
        <label htmlFor="images" className="mb-2 block text-lg text-3xl text-gray-700 font-medium">
          Upload profile picture
        </label>
        <div className="relative">
          <input
            id="images"
            name="images"
            type="file"
            multiple
            className="block w-full text-lg text-3xl text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-200 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-300"
          />
          
        </div>
      </div> */}
    </div>
  
    <div className="mt-6 flex justify-end gap-4">
      <Link
        href="/properties"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg text-3xl font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button type="submit">Create Account</Button>
    </div>
  </form>
  
  
  );
}
