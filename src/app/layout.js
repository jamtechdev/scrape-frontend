import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Scrape Frontend",
  description: "Authentication and Dashboard App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
