import Link from 'next/link';
import NewsList from '../../../../../components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '../../../../../lib/news';
import { NewsItem } from '../../../../../types/news';
import { Suspense } from 'react';

async function FilteredHeader({ year }) {
  const links: string[] = year
    ? getAvailableNewsMonths(year) // no await causes the suspense fallback to not show
    : await getAvailableNewsYears();

  return (
    <header id='archive-header'>
      <nav>
        <ul>
          {links.map((link: string) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news: NewsItem[];

  if (year) {
    if (month) {
      news = await getNewsForYearAndMonth(year, month);
    } else {
      news = await getNewsForYear(year);
    }
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

async function validateFilter(
  selectedYear: string,
  selectedMonth: string,
  availableYears: string[],
  availableMonths: string[],
): Promise<void> {
  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth))
  ) {
    throw new Error('Invalid filter.');
  }
}

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const selectedYear: string = filter?.[0];
  const selectedMonth: string = filter?.[1];

  const availableYears: string[] = await getAvailableNewsYears();
  const availableMonths: string[] = selectedYear
    ? getAvailableNewsMonths(selectedYear)
    : [];

  await validateFilter(
    selectedYear,
    selectedMonth,
    availableYears,
    availableMonths,
  );

  return (
    <>
      <Suspense fallback={ArchiveLinksLoading()}>
        <FilteredHeader year={selectedYear} />
      </Suspense>
      <Suspense fallback={ArchiveNewsLoading()}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>

    // <Suspense fallback={ArchiveNewsLoading()}>
    //   <FilteredHeader year={selectedYear} links={links} />
    //   <FilteredNews year={selectedYear} month={selectedMonth} />
    // </Suspense>
  );
}

function ArchiveLinksLoading() {
  return <p>Loading the archive links...</p>;

}
function ArchiveNewsLoading() {
  return <p>Loading the archive news...</p>;
}
