import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MainContainer from "@/components/MainContainer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Muhammad Sahdan Ramadhan — Portofolio",
    template: "%s | Muhammad Sahdan Ramadhan",
  },
  description: "Portofolio Muhammad Sahdan Ramadhan — Software Engineer, Videographer & Gamer.",
  metadataBase: new URL("https://portofolio-shdnn.vercel.app"),
  openGraph: {
    title: "Muhammad Sahdan Ramadhan",
    description: "Portofolio Muhammad Sahdan Ramadhan — Software Engineer, Videographer & Gamer.",
    url: "https://portofolio-shdnn.vercel.app",
    siteName: "Portfolio Muhammad Sahdan Ramadhan",
    images: ["/og-image.jpg"],
    locale: "id_ID",
    type: "website",
  },
  verification: {
    google: "K5OeZ02El_pXDSKzmJrn_h5Fql9cCZ190E6NNxIWl4g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Background />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <MainContainer>{children}</MainContainer>
          <Footer />
        </div>
      </body>
    </html>
  );
}