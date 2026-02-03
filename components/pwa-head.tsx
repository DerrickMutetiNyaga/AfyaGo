'use client'

import { useEffect } from 'react'

export function PWAHead() {
  useEffect(() => {
    // Add manifest link if not already present
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifestLink = document.createElement('link')
      manifestLink.rel = 'manifest'
      manifestLink.href = '/manifest.webmanifest'
      document.head.appendChild(manifestLink)
    }

    // Add theme color meta if not already present
    if (!document.querySelector('meta[name="theme-color"]')) {
      const themeColor = document.createElement('meta')
      themeColor.name = 'theme-color'
      themeColor.content = '#0EA5E9'
      document.head.appendChild(themeColor)
    }

    // Add iOS meta tags if not already present
    const iosTags = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Afyago' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]

    iosTags.forEach(({ name, content }) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    })

    // Add apple-touch-icon if not already present
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      const appleIcon = document.createElement('link')
      appleIcon.rel = 'apple-touch-icon'
      appleIcon.href = '/icons/icon-192.png'
      document.head.appendChild(appleIcon)
    }
  }, [])

  return null
}


