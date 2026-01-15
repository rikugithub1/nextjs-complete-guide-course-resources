import Link from 'next/link';
import NewsList from '../../../../../components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '../../../../../lib/news';
import { NewsItem } from '../../../../../types/news';

function validateFilter(selectedYear: number, selectedMonth: number): void {
  if (
    (!isNaN(selectedYear) && !getAvailableNewsYears().includes(selectedYear)) ||
    (!isNaN(selectedMonth) &&
      !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error('Invalid filter.');
  }
}

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const selectedYear: number = Number(filter?.[0]);
  const selectedMonth: number = Number(filter?.[1]);

  let news: NewsItem[];
  let links: number[] = getAvailableNewsYears();

  validateFilter(selectedYear, selectedMonth);

  if (!isNaN(selectedYear)) {
    if (!isNaN(selectedMonth)) {
      news = getNewsForYearAndMonth(selectedYear, selectedMonth);
      links = [];
    } else {
      news = getNewsForYear(selectedYear);
      links = getAvailableNewsMonths(selectedYear);
    }
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return (
    <>
      <header id='archive-header'>
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
