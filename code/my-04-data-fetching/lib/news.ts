import sql from 'better-sqlite3';

import newsData from '../data/news.json';
import { NewsItem } from '../types/news';

// Type the imported JSON data as NewsItem array
const NEWS: NewsItem[] = newsData;
const db = sql('./data.db')

export async function getNews(): Promise<NewsItem[]> {
  const news = db.prepare('SELECT * FROM news').all()
  await new Promise(resolve => setTimeout(resolve, 2000))
  return news;
}

export async function getNewsItem(slug: string): Promise<NewsItem> {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears(): Promise<string[]> {
  type Year = {
    year: {
      year: string
    }
  }

  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year: Year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years;
}

export function getAvailableNewsMonths(year: string): string[] {
  type Month = {
    month: {
      month: string
    }
  }

  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month: Month) => month.month);
}

export async function getNewsForYear(year: string): Promise<NewsItem[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(year: string, month: string): Promise<NewsItem[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

