import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SIP AI Smart Water Management',
  description: 'Turn irrigation water into field-specific actions. Know what to plant, how much to irrigate, and where to save inputs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
