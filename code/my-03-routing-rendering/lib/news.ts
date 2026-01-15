import newsData from '../data/news.json';
import { NewsItem } from '../types/news';

// Type the imported JSON data as NewsItem array
const NEWS: NewsItem[] = newsData;

export async function getNews(): Promise<NewsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NEWS;
}

export function getLatestNews(): NewsItem[] {
  return NEWS.slice(0, 3);
}

export function getAvailableNewsYears(): number[] {
  return NEWS.reduce<number[]>((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: number): number[] {
  return NEWS.reduce<number[]>((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === year) {
      const month = new Date(news.date).getMonth() + 1; // add one for readability
      if (!months.includes(month)) {
        months.push(month);
      }
    }
    return months;
  }, []).sort((a, b) => a - b);
}

export function getNewsForYear(year: number): NewsItem[] {
  return NEWS.filter((news) => {
      return new Date(news.date).getFullYear() === year
    }
  );
}

export function getNewsForYearAndMonth(year: number, month: number): NewsItem[] {
  return NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === year && newsMonth === month;
  });
}

