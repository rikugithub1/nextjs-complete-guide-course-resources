'use server';

import { uploadImage } from '@/lib/cloudinary';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export async function createPost(prevAction, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title?.trim()) {
    errors.push('Title is required.');
  }

  if (!content?.trim()) {
    errors.push('Content is required.');
  }

  if (!image || image.size === 0) {
    errors.push('Image is required.');
  }

  if (errors) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Image upload failed, post was not created. Please try again later.',
    );
  }
  console.log('Stored image...');
  console.log('Now storing post');
  await storePost({
    imageUrl: imageUrl,
    title: title,
    content: content,
    userId: 1,
  });
  console.log('Stored post...');

  redirect('/feed');
}
