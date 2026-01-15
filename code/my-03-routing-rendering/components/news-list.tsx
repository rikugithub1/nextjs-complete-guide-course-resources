import Link from 'next/link';
import { NewsItem } from '../types/news';

type NewsListProps = {
  news: NewsItem[];
};

export default function NewsList({ news }: NewsListProps) {
  return (
    <ul className='news-list'>
      {news.map((newsItem: NewsItem) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
