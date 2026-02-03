'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface EngagementData {
  timeOnSite: number // in milliseconds
  hasScrolled: boolean
  hasClicked: boolean
  hasViewedTests: boolean
  hasStartedBooking: boolean
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [engagement, setEngagement] = useState<EngagementData>({
    timeOnSite: 0,
    hasScrolled: false,
    hasClicked: false,
    hasViewedTests: false,
    hasStartedBooking: false,
  })

  // Track user engagement
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Track time on site
    const startTime = Date.now()
    const timeTracker = setInterval(() => {
      setEngagement((prev) => ({
        ...prev,
        timeOnSite: Date.now() - startTime,
      }))
    }, 1000) // Update every second

    // Track scrolling
    const handleScroll = () => {
      setEngagement((prev) => ({ ...prev, hasScrolled: true }))
    }

    // Track clicks
    const handleClick = () => {
      setEngagement((prev) => ({ ...prev, hasClicked: true }))
    }

    // Check for meaningful actions
    const checkMeaningfulAction = () => {
      const path = window.location.pathname
      const hash = window.location.hash
      
      if (path === '/book') {
        setEngagement((prev) => ({ ...prev, hasStartedBooking: true }))
      } else if (path === '/' && (hash === '#tests' || hash === '#packages')) {
        setEngagement((prev) => ({ ...prev, hasViewedTests: true }))
      }
    }

    // Track clicks on test-related links
    const handleTestClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link) {
        const href = link.getAttribute('href')
        if (href && (href.includes('#tests') || href.includes('#packages') || href === '/book')) {
          if (href === '/book') {
            setEngagement((prev) => ({ ...prev, hasStartedBooking: true }))
          } else {
            setEngagement((prev) => ({ ...prev, hasViewedTests: true }))
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('click', handleTestClick, { passive: true })
    window.addEventListener('hashchange', checkMeaningfulAction)
    window.addEventListener('popstate', checkMeaningfulAction)
    
    // Check on initial load
    checkMeaningfulAction()
    
    // Check periodically for route changes
    const routeCheckInterval = setInterval(checkMeaningfulAction, 1000)

    return () => {
      clearInterval(timeTracker)
      clearInterval(routeCheckInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('click', handleTestClick)
      window.removeEventListener('hashchange', checkMeaningfulAction)
      window.removeEventListener('popstate', checkMeaningfulAction)
    }
  }, [])

  // Check dismissal state and show prompt based on engagement
  useEffect(() => {
    if (typeof window === 'undefined' || isInstalled) return

    // Check if permanently dismissed (installed)
    const installed = localStorage.getItem('pwa-installed')
    if (installed === 'true') {
      setIsInstalled(true)
      return
    }

    // Check dismissal state
    const dismissedData = localStorage.getItem('pwa-install-dismissed')
    const ignoredData = localStorage.getItem('pwa-install-ignored')

    if (dismissedData) {
      const dismissedDate = new Date(dismissedData)
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
      
      // Suppress for 7 days if dismissed
      if (daysSinceDismissed < 7) {
        return
      }
    }

    if (ignoredData) {
      const ignoredDate = new Date(ignoredData)
      const daysSinceIgnored = (Date.now() - ignoredDate.getTime()) / (1000 * 60 * 60 * 24)
      
      // Show one reminder after 3 days, then stop
      if (daysSinceIgnored < 3) {
        return
      } else if (daysSinceIgnored >= 3 && daysSinceIgnored < 6) {
        // Show reminder (only once)
        const reminderShown = localStorage.getItem('pwa-install-reminder-shown')
        if (reminderShown) {
          return
        }
      } else {
        // Stop showing after 6 days
        return
      }
    }

    // Don't show on certain pages (sign-in, admin, etc.)
    const path = window.location.pathname
    const excludedPaths = ['/signin', '/admin', '/dashboard']
    if (excludedPaths.some((p) => path.startsWith(p))) {
      return
    }

    // Check engagement requirements
    const timeOnSiteMinutes = engagement.timeOnSite / (1000 * 60)
    const hasMeaningfulAction = engagement.hasViewedTests || engagement.hasStartedBooking
    const hasBasicEngagement = engagement.hasScrolled || engagement.hasClicked

    // Show prompt only if:
    // 1. At least 2-3 minutes on site (using 2.5 minutes as threshold)
    // 2. Has meaningful action (viewed tests or started booking)
    // 3. Has basic engagement (scrolled or clicked)
    if (
      timeOnSiteMinutes >= 2.5 &&
      hasMeaningfulAction &&
      hasBasicEngagement
    ) {
      setShowPrompt(true)
      if (ignoredData) {
        localStorage.setItem('pwa-install-reminder-shown', 'true')
      }
    }
  }, [engagement, isInstalled])

  // Listen for beforeinstallprompt event
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if app was installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      localStorage.setItem('pwa-installed', 'true')
      localStorage.removeItem('pwa-install-dismissed')
      localStorage.removeItem('pwa-install-ignored')
      localStorage.removeItem('pwa-install-reminder-shown')
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
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
        localStorage.setItem('pwa-installed', 'true')
        localStorage.removeItem('pwa-install-dismissed')
        localStorage.removeItem('pwa-install-ignored')
        localStorage.removeItem('pwa-install-reminder-shown')
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error showing install prompt:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString())
    localStorage.removeItem('pwa-install-ignored')
    localStorage.removeItem('pwa-install-reminder-shown')
  }

  const handleIgnore = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-ignored', new Date().toISOString())
    localStorage.removeItem('pwa-install-dismissed')
  }

  // Don't show if already installed
  if (isInstalled || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="bg-card border border-border rounded-xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          {/* Close Button */}
          <button
            onClick={handleIgnore}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex items-start gap-4 pr-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {isIOS ? (
                <Smartphone className="w-6 h-6 text-primary" />
              ) : (
                <Download className="w-6 h-6 text-primary" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-foreground text-base">
                Install Afyago
              </h3>
              <p className="text-sm text-muted-foreground">
                {isIOS ? (
                  <>
                    Get a faster, app-like experience. Add Afyago to your home screen.
                    <br />
                    <span className="font-medium text-foreground mt-1 block">
                      Tap Share → Add to Home Screen
                    </span>
                  </>
                ) : (
                  'Get a faster, app-like experience. Add Afyago to your home screen for quick access.'
                )}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="flex-1"
            >
              Not now
            </Button>
            {!isIOS && deferredPrompt && (
              <Button
                onClick={handleInstall}
                size="sm"
                className="flex-1 gap-2"
              >
                <Download className="w-4 h-4" />
                Install
              </Button>
            )}
            {isIOS && (
              <Button
                onClick={handleIgnore}
                size="sm"
                className="flex-1 gap-2"
              >
                Got it
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
