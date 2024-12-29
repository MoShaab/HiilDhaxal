'use client';
import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function Navigator() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.back()}>
    <ArrowLeftIcon className = "text-gray-900 w-10" />
    <span className="gap-2 rounded px-4 py-2 text-gray-900 text-sm md:text-lg font-medium hover:bg-blue-600">
  
    Dib u laabo
  </span>
    
</button>
  )
}