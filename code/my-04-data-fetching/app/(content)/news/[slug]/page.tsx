import { notFound } from 'next/navigation';
import { NewsItem } from '../../../../types/news';
import { getNews, getNewsItem } from '../../../../lib/news';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem: NewsItem = await getNewsItem(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className='news-article'>
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
