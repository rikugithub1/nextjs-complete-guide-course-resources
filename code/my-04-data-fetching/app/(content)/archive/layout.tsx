import { ReactNode } from 'react';

type ArchiveLayoutProps = {
  archive: ReactNode;
  latest: ReactNode;
};

export default function ArchiveLayout({ archive, latest }: ArchiveLayoutProps) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id='archive-filter'>{archive}</section>
      <section id='archive-latest'>{latest}</section>
    </div>
  );
}
