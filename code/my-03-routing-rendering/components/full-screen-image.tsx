'use client';

import { useRouter } from 'next/navigation';

type FullScreenImageProps = {
  image: string;
  title: string;
};

export default function FullScreenImage({
  image,
  title,
}: FullScreenImageProps) {
  const router = useRouter();

  return (
    <>
      <div className='modal-backdrop' onClick={() => router.back()} />
      <dialog className='modal' open>
        <div className='fullscreen-image'>
          <img src={`/images/news/${image}`} alt={title} />
        </div>
      </dialog>
    </>
  );
}
