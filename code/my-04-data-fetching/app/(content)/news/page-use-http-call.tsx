import { getNews } from '../../../lib/news';
import NewsList from '../../../components/news-list';

export default async function NewsListPage() {

  const response = await fetch('http://localhost:8080/news')
  
  if (!response.ok) {
    throw new Error('Fialed to fetch news.')
  }

  const NEWS = await response.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={NEWS} />
    </>
  );
}
