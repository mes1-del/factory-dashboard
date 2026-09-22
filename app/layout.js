import './globals.css';

export const metadata = {
  title: 'Factory Master Dashboard',
  description: 'Live Factory Dashboard connected with Google Sheets',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">{children}</body>
    </html>
  );
}
