---
Task ID: 4
Agent: SEO Agent
Task: Review and improve SEO indexing, metadata, favicon/logo for Azores Essence

Work Log:
- Updated /src/app/layout.tsx with comprehensive Metadata export including:
  - metadataBase pointing to https://azoresessence.pt
  - Title with template support (%s | Azores Essence)
  - Extended keyword list (19 keywords covering products, regions, search intents)
  - Authors/creator/publisher set to Azores Meet, Lda with URL
  - formatDetection for telephone, email, address
  - robots with googleBot directives (max-image-preview: large, max-snippet: -1)
  - Full OpenGraph with locale pt_PT, hero image (1344x768), siteName
  - Twitter card summary_large_image with hero image
  - alternates with canonical, pt-PT and en language variants
  - manifest link to /manifest.json
  - Complete icons array for 32x32, 192x192, and apple-touch-icon 180x180
  - category: shopping
- Added Viewport export with viewport-fit=cover for iOS safe areas, themeColor #059669
- Added additional head meta tags: apple-mobile-web-app-capable, apple-mobile-web-app-status-bar-style, apple-mobile-web-app-title, mobile-web-app-capable, application-name, msapplication-TileImage, msapplication-TileColor
- Created /public/manifest.json for PWA support with name, short_name, description, theme_color #059669, 192x192 and 512x512 icons, categories shopping/food, lang pt
- Updated /public/robots.txt with wildcard User-agent, Allow /, Disallow /api/, Sitemap reference
- Created /public/sitemap.xml with URL entry for https://azoresessence.pt, lastmod 2026-03-01, weekly changefreq, priority 1.0
- All existing functionality preserved (Providers wrapper, Toaster, fonts)
- Lint passes cleanly, dev server running without errors

Stage Summary:
- Full SEO metadata coverage for search engines, social sharing, and PWA
- robots.txt properly blocks /api/ and references sitemap
- sitemap.xml provides root URL for crawler discovery
- manifest.json enables "Add to Home Screen" on mobile devices
- iOS safe area support via viewport-fit=cover
- All icons/favicon point to azores-logo.png in multiple sizes
