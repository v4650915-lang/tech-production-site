import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "РПК Технология | Широкоформатная печать в Нижневартовске",
  description: "Рекламно-производственная компания Технология: широкоформатная и интерьерная печать, плоттерная, лазерная и фрезерная резка, мобильные стенды, сувенирная продукция.",
  keywords: ["широкоформатная печать", "интерьерная печать", "плоттерная резка", "лазерная резка", "фрезерная резка", "мобильные стенды", "сувенирная продукция", "Нижневартовск"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster richColors position="top-right" duration={2000} />
      </body>
    </html>
  );
}
