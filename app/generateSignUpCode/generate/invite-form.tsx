'use client';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
export default function InvitePage() {
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, inviteCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Invite email sent successfully.');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Failed to send the invite email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invite-container">
      
      <form onSubmit={sendInvite} className="max-w-md mx-auto text-black">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <label htmlFor="email" className="mb-2 block text-lg text-3xl font-medium">Email:</label>
          <div className = "rlative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter Email to Send Invite Code to'
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-lg text-3xl outline-2 placeholder:text-gray-500"
          />
          
          </div>
        </div>
        <div>
          <label htmlFor="inviteCode"
           className="mb-3 mt-5 block text-lg font-medium text-gray-900"
          >Invite Code:</label>
          <div className = "relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-lg text-3xl text-black outline-2 placeholder:text-gray-500"
            type="text"
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            required
            placeholder='Enter the Invite Code to Share'
          />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
      <Link
        href="/properties"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg text-3xl font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button type="submit" disabled={loading}>
      {loading ? 'Sending...' : 'Send Invite'}
      </Button>
    </div>
    <div  className="peer block w-full  py-[9px] pl-10 text-lg text-3xl text-black outline-2">
    {message && <p>{message}</p>}
    </div>
    
      </form>

      
    </div>
  );
}
