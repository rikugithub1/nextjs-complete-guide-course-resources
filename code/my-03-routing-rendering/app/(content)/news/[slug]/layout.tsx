import { ReactNode } from 'react';

type NewsDetailLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function NewsDetailLayout({
  children,
  modal,
}: NewsDetailLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
