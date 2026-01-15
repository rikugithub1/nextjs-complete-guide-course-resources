import { notFound } from 'next/navigation';
import { getNews } from '../../../../../../lib/news';
import FullScreenImage from '../../../../../../components/full-screen-image';

export default async function InterceptedImagePage({ params }) {
  const { slug } = await params;
  const NEWS = await getNews();

  const newsItem = NEWS.find((newsItem) => newsItem.slug === slug);

  if (!newsItem) {
    notFound();
  }

  return <FullScreenImage image={newsItem.image} title={newsItem.title} />;
}
