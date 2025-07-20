import type { Metadata } from 'next';
import '../styles/base.css';

export const metadata: Metadata = {
  title: 'TodoMVC',
  description: 'TodoMVC app built with Next.js and React',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
