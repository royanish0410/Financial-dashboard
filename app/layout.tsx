import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "./components/Navbar";

export const metadata = { title: "Financial Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <div className="min-h-screen">
            <NavBar />
            <main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
