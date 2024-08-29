import Image from 'next/image';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-gray-400">
      <div className="relative mx-auto flex w-full mt-10 max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full bg-gray-200 rounded">
          <div className="w-32 p-3 text-white md:w-36">
          <Image src="/logo.png" width={300} height={300} alt="Logo" />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}