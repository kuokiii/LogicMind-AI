import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProgressProvider } from '@/contexts/ProgressContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ProgressProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  )
}

