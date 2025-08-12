import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthProvider } from "@/lib/auth"
import { CartProvider } from "@/lib/cart"
// Added ThemeProvider and I18nProvider imports and wrappers
import { ThemeProvider } from "@/lib/theme"
import { I18nProvider } from "@/lib/i18n"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "ShopHub - Your Ultimate Shopping Destination",
  description:
    "Discover amazing products with exceptional service and unbeatable prices. Shop electronics, fashion, home & garden, and more.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body>
        {/* Wrapped entire app with ThemeProvider and I18nProvider */}
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <CartProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </CartProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
