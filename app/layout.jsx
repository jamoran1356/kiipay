import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kiipay - Soluciones de pago",
  description: "Secure, fast, and reliable payment processing solutions for businesses of all sizes.",
  autor: "Kiipay",
  keywords: "payment processing, payment gateway, payment solutions, payment API",
  version: "1.0.23",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { version } from "os"
