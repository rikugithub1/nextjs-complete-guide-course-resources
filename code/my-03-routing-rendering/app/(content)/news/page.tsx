import { getNews } from '../../../lib/news';
import NewsList from '../../../components/news-list';

export default async function NewsListPage() {
  const NEWS = await getNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={NEWS} />
    </>
  );
}
