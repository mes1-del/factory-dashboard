export const metadata = {
  title: 'Factory Master Dashboard',
  description: 'Live Factory Dashboard connected with Google Sheets',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  );
}
