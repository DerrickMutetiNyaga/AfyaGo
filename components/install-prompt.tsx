'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt when beforeinstallprompt fires
      setTimeout(() => {
        setShowPrompt(true)
      }, 2000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if app was installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      sessionStorage.removeItem('pwa-install-dismissed-session')
    }
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if dismissed in this session
    const dismissedThisSession = sessionStorage.getItem('pwa-install-dismissed-session')
    
    // Show prompt on every visit after a short delay (unless dismissed this session)
    // This ensures the page loads first, then shows the prompt
    let showTimer: NodeJS.Timeout | null = null
    if (!dismissedThisSession) {
      showTimer = setTimeout(() => {
        setShowPrompt(true)
      }, 2000)
    }

    return () => {
      if (showTimer) {
        clearTimeout(showTimer)
      }
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // For iOS, we can't programmatically trigger install
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setIsInstalled(true)
        setShowPrompt(false)
        localStorage.removeItem('pwa-install-dismissed')
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error showing install prompt:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Store dismissal for this session only (using sessionStorage)
    // This way it will show again on next visit
    sessionStorage.setItem('pwa-install-dismissed-session', 'true')
  }

  // Don't show if already installed
  if (isInstalled || !showPrompt) {
    return null
  }

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install Afyago</DialogTitle>
          <DialogDescription>
            {isIOS ? (
              <>
                Get a faster, app-like experience. Add Afyago to your home screen.
                <br />
                <br />
                <strong>Tap Share → Add to Home Screen</strong>
              </>
            ) : (
              'Get a faster, app-like experience. Add Afyago to your home screen.'
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="w-full sm:w-auto"
          >
            Not now
          </Button>
          {!isIOS && deferredPrompt && (
            <Button
              onClick={handleInstall}
              className="w-full sm:w-auto"
            >
              Install
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

