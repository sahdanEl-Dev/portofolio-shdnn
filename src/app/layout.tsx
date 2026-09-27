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
  title: "Muhammad Sahdan Ramadhan | Portfolio",
  description: "Software engineer, photographer, and gamer.",
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