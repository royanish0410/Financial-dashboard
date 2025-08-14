import "./globals.css";
import NavBar from "./components/Navbar";

export const metadata = { title: "Financial Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <NavBar />
          <main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
