# Preview Gate Configuration

This application includes a global access gate that can be enabled to restrict public access during private preview periods.

## How It Works

The preview gate intercepts all routes (except static assets) and redirects users to a single informational page (`/preview`) that displays a message about the private preview and provides a contact email for access requests.

## Enabling/Disabling the Gate

The preview gate is controlled by the `NEXT_PUBLIC_PREVIEW_GATE_ENABLED` environment variable.

### To Enable the Gate (Default)

The gate is **enabled by default** for safety. No action needed if you want it enabled.

### To Disable the Gate

Set the environment variable to `false`:

**Option 1: Environment File (Recommended)**
Create or update `.env.local`:
```
NEXT_PUBLIC_PREVIEW_GATE_ENABLED=false
```

**Option 2: System Environment Variable**
```bash
export NEXT_PUBLIC_PREVIEW_GATE_ENABLED=false
```

**Option 3: Deployment Platform**
Set the environment variable in your deployment platform (Vercel, Netlify, etc.):
- Variable name: `NEXT_PUBLIC_PREVIEW_GATE_ENABLED`
- Value: `false`

## What Gets Blocked

When enabled, the gate redirects all routes to `/preview` except:
- `/preview` (the gate page itself)
- `/_next/*` (Next.js static assets)
- `/api/*` (API routes)
- `/manifest.webmanifest` (PWA manifest)
- `/sw.js` (Service worker)
- `/icons/*` (Icon files)
- `/icon-*` (Icon files)
- `/apple-icon*` (Apple icons)
- `/favicon*` (Favicon files)
- `/_redirects` (Netlify redirects)

## Preview Page

The preview page (`/preview`) displays:
- AfyaGo branding
- A message indicating the application is in private preview
- Contact email: `support@afyago.co.ke`
- A mailto link for access requests

## Important Notes

1. **Code Remains Intact**: The gate is a routing layer only. All application code remains intact and deployable.

2. **No Code Changes Required**: To disable the gate, simply set the environment variable - no code changes needed.

3. **Static Assets Work**: Static assets, API routes, and PWA files continue to work normally.

4. **Temporary Solution**: This is designed as a temporary wrapper, not a permanent shutdown mechanism.

## Testing

To test the gate:
1. Ensure `NEXT_PUBLIC_PREVIEW_GATE_ENABLED` is not set to `false`
2. Visit any route (e.g., `/`, `/book`, `/dashboard`)
3. You should be redirected to `/preview`
4. Static assets should still load (check Network tab)

To test with gate disabled:
1. Set `NEXT_PUBLIC_PREVIEW_GATE_ENABLED=false`
2. Restart the development server
3. All routes should work normally

