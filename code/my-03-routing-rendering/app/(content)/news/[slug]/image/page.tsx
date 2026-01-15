import { notFound } from 'next/navigation';
import { getNews } from '../../../../../lib/news';

export default async function ImagePage({ params }) {
  const { slug } = await params;
  const NEWS = await getNews();

  const newsItem = NEWS.find((newsItem) => newsItem.slug === slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className='fullscreen-image'>
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
