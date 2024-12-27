'use client';

import { useState, useEffect } from 'react';
import { FacebookIcon, LinkedinIcon, ShareIcon } from 'lucide-react';

type ShareButtonProps = {
  url: string;
  title: string;
  platform: 'twitter' | 'facebook' | 'linkedin';
};

function TwitterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.2833 10.1571L23.2178 0H21.1006L13.3427 8.82857L7.14437 0H0L9.36563 13.3714L0 24H2.11722L10.3062 14.7L16.8557 24H24L14.2833 10.1571ZM11.3833 13.5086L10.4089 12.1457L2.88682 1.67143H6.1444L12.0744 10.0457L13.0489 11.4086L21.0039 22.4057H17.7463L11.3833 13.5086Z" fill="currentColor"/>
    </svg>
  );
}

function ShareButton({ url, title, platform }: ShareButtonProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  const icons = {
    twitter: <TwitterIcon />,
    facebook: <FacebookIcon className="w-6 h-6" />,
    linkedin: <LinkedinIcon className="w-6 h-6" />,
  };

  const colors = {
    twitter: 'text-blue-400 hover:text-blue-500',
    facebook: 'text-blue-600 hover:text-blue-700',
    linkedin: 'text-blue-700 hover:text-blue-800',
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const platformUrl = shareUrls[platform];

    if (platformUrl) {
      window.open(platformUrl, '_blank', 'width=550,height=450');
      console.log(`Sharing to ${platform}:`, platformUrl);
    } else {
      console.error(`Invalid platform: ${platform}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ${colors[platform]}`}
      aria-label={`Share on ${platform}`}
    >
      {icons[platform]}
    </button>
  );
}

export default function ShareButtons({ title }: { title: string }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setIsClient(true);
      console.log('Current URL:', window.location.href);
    }
  }, []);

  const handleWebShare = async () => {
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: title,
          url: currentUrl,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <ShareButton url={currentUrl} title={title} platform="twitter" />
      <ShareButton url={currentUrl} title={title} platform="facebook" />
      <ShareButton url={currentUrl} title={title} platform="linkedin" />
      {isClient && 'share' in navigator && (
        <button
          onClick={handleWebShare}
          className="flex items-center justify-center p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-700"
          aria-label="Share"
        >
          <ShareIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
