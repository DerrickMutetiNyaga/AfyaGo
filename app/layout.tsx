import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { InstallPrompt } from '@/components/install-prompt'
import { PWAHead } from '@/components/pwa-head'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AfyaGo - Lab Tests at Your Doorstep | Nakuru, Kenya',
  description: 'Book lab tests online and get samples collected at home. Fast, affordable, and trustworthy healthcare in Nakuru. M-Pesa & card payments accepted.',
  generator: 'v0.app',
  manifest: '/manifest.webmanifest',
  themeColor: '#0EA5E9',
  appleWebApp: {
    capable: true,
    title: 'Afyago',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <PWAHead />
        <ServiceWorkerRegister />
        {children}
        <InstallPrompt />
        <Analytics />
      </body>
    </html>
  )
}
