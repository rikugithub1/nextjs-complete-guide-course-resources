import { notFound } from 'next/navigation';
import { getNews, getNewsItem } from '../../../../../../lib/news';
import FullScreenImage from '../../../../../../components/full-screen-image';

export default async function InterceptedImagePage({ params }) {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    notFound();
  }

  return <FullScreenImage image={newsItem.image} title={newsItem.title} />;
}
