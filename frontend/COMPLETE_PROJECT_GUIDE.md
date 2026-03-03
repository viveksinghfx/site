# Complete Project Guide - VIVEKSINGH.TECH

## Table of Contents
1. Project Overview
2. File Structure
3. Key Features
4. How to Customize Everything
5. Adding New Content
6. Deployment
7. Troubleshooting
8. Best Practices

---

## 1. Project Overview

**Project**: Personal AI Engineer Portfolio
**Technology**: Next.js 16, React 19, TypeScript, Tailwind CSS
**Hosting**: Vercel
**Purpose**: Showcase projects, skills, and experience to recruiters and collaborators

### Key Pages
- **Home** - Hero section with featured projects
- **About** - Biography and professional background
- **Projects** - Portfolio grid with detailed case studies
- **Experience** - Timeline of work experience
- **Resume** - CV with download option
- **Contact** - Email and social links

---

## 2. File Structure Explained

### Root Files
```
/vercel/share/v0-project/
├── app/                         # Next.js app directory
├── components/                  # Reusable React components
├── public/                      # Static assets (images, fonts)
├── lib/                         # Utility functions
├── styles/                      # Global CSS
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
└── next.config.mjs             # Next.js config
```

### App Directory Structure
```
app/
├── layout.tsx                  # Root layout (all pages)
├── page.tsx                    # Home page (/)
├── globals.css                 # Global styles
│
├── about/
│   └── page.tsx               # /about page
│
├── projects/
│   ├── page.tsx               # /projects page (grid)
│   └── [project]/
│       └── page.tsx           # /projects/[id] (details)
│
├── experience/
│   └── page.tsx               # /experience page
│
├── resume/
│   └── page.tsx               # /resume page
│
├── contact/
│   └── page.tsx               # /contact page
│
└── other-pages/
    └── page.tsx               # Other pages...
```

### Components Directory
```
components/
├── navigation.tsx              # Header with nav links
├── footer.tsx                 # Footer with links
├── hero-section.tsx           # Homepage hero
├── featured-projects.tsx      # Project cards
├── contact-cta.tsx            # Contact section
│
├── Custom Components/
│   ├── glass-card.tsx         # Card with glass effect
│   ├── logo.tsx               # Logo/brand mark
│   ├── skills-section.tsx     # Skills showcase
│   └── [others].tsx           # Other custom components
│
└── ui/                        # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── [other-ui].tsx
```

---

## 3. Key Features

### Current Features
1. **Responsive Design** - Works on mobile, tablet, desktop
2. **Dark Theme** - Eye-friendly dark color scheme
3. **Smooth Animations** - Framer Motion for transitions
4. **Type Safety** - Full TypeScript support
5. **Accessible** - WCAG 2.1 compliant
6. **SEO Optimized** - Meta tags and structured data
7. **Fast Performance** - Optimized images and code splitting
8. **Mobile Menu** - Hamburger menu on small screens

### Design System
- **Colors**: Cyan (#00B4D8), Dark Gray, Purple accents
- **Typography**: Rostex (headings), Inter (body), JetBrains Mono (code)
- **Spacing**: 4px base unit (4, 8, 12, 16, 24, 32...)
- **Animations**: Smooth easing (0.3-0.6s duration)

---

## 4. How to Customize Everything

### Change Colors
**File**: `app/globals.css`

```css
:root {
  --primary: 200 95% 50%;        /* Main color (cyan) */
  --secondary: 222 20% 12%;      /* Secondary color */
  --accent: 200 95% 50%;         /* Accent color */
  /* Change HSL values */
}
```

**Color Format**: HSL (Hue Saturation Lightness)
- Hue: 0-360 (0=red, 120=green, 240=blue)
- Saturation: 0-100%
- Lightness: 0-100% (0=black, 50=normal, 100=white)

### Change Fonts
**File**: `app/layout.tsx`

```tsx
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
```

Available Google Fonts: [fonts.google.com](https://fonts.google.com)

### Change Navigation Links
**File**: `components/navigation.tsx`

Find the `links` array:
```tsx
const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]
```

**To add a link**:
```tsx
{ href: '/new-page', label: 'New Page' }
```

**To remove a link**: Delete the entire line

**To reorder**: Move lines around

### Change Hero Text
**File**: `components/hero-section.tsx`

Find and update:
```tsx
<h1>Your Headline Here</h1>
<p>Your description here</p>
```

### Change Featured Projects
**File**: `components/featured-projects.tsx`

Find the `projects` array and update each project:
```tsx
{
  id: '1',
  title: 'Project Name',
  description: 'What it does',
  image: '/images/project.jpg',
  tags: ['React', 'TypeScript'],
  link: '/projects/project-slug'
}
```

### Change Resume Content
**File**: `app/resume/page.tsx`

Update these arrays:
```tsx
const experience = [...]  // Work history
const education = [...]   // Education
const skillCategories = [...] // Skills
const certifications = [...] // Certificates
```

---

## 5. Adding New Content

### Add a New Project
1. **Create project folder**:
   ```
   app/projects/[new-project]/page.tsx
   ```

2. **Copy project template** from existing project

3. **Add project image**:
   ```
   public/projects/new-project.jpg
   ```

4. **Update featured projects** in `components/featured-projects.tsx`:
   ```tsx
   {
     id: 'new-project',
     title: 'New Project',
     description: 'Description',
     image: '/projects/new-project.jpg',
     tags: ['Tech1', 'Tech2'],
     link: '/projects/new-project'
   }
   ```

### Add a New Page
1. **Create folder and file**:
   ```
   app/new-page/page.tsx
   ```

2. **Copy template** from existing page:
   ```tsx
   export default function NewPage() {
     return (
       <PortfolioShell>
         <section className="py-12">
           {/* Your content */}
         </section>
       </PortfolioShell>
     )
   }
   ```

3. **Update navigation** in `components/navigation.tsx`:
   ```tsx
   { href: '/new-page', label: 'New Page' }
   ```

### Add a Blog Section
1. **Create blog folder**:
   ```
   app/blog/page.tsx       # Blog listing
   app/blog/[slug]/page.tsx # Blog post
   ```

2. **Create blog post component**:
   ```tsx
   export default function BlogPost() {
     return (
       <article>
         <h1>Post Title</h1>
         <p>Post content...</p>
       </article>
     )
   }
   ```

3. **Add to navigation**:
   ```tsx
   { href: '/blog', label: 'Blog' }
   ```

---

## 6. Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

**That's it!** Vercel automatically deploys on every push.

### Custom Domain
1. In Vercel dashboard: Settings → Domains
2. Add your domain (e.g., viveksingh.tech)
3. Update DNS records (Vercel provides instructions)
4. Wait 24-48 hours for propagation

### Environment Variables
1. Create `.env.local` locally:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```

2. In Vercel: Settings → Environment Variables
3. Add same variables for production

---

## 7. Troubleshooting

### Page Not Found
- Check file path matches route exactly
- Ensure `page.tsx` is in correct folder
- Check for typos in folder names

### Styling Not Applied
- Clear build: `npm run build`
- Check Tailwind classes are correct
- Ensure globals.css is imported in layout.tsx
- Check CSS variable names

### Images Not Loading
- Check image path in `/public` folder
- Use absolute paths: `/images/file.jpg`
- Verify file extension matches
- Check image is not too large

### Navigation Link Not Working
- Verify route exists (folder with page.tsx)
- Check href matches route path
- Test with hard refresh (Ctrl+Shift+R)

### Build Errors
- Check for TypeScript errors: `npm run type-check`
- Read error message carefully
- Check file imports and exports
- Look for missing semicolons or brackets

---

## 8. Best Practices

### Content
- Keep text concise and scannable
- Use bullet points for lists
- Include dates on time-sensitive content
- Update projects regularly
- Add images to projects for visual interest

### Performance
- Optimize images (compress before upload)
- Use WebP format for images
- Lazy load images below fold
- Minimize JavaScript
- Cache static assets

### Accessibility
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include alt text for images
- Use sufficient color contrast
- Test with keyboard navigation
- Test with screen readers

### SEO
- Update page titles (unique per page)
- Write descriptive meta descriptions
- Use proper heading hierarchy (h1, h2, h3)
- Include keywords naturally
- Add structured data (JSON-LD)

### Code Quality
- Use TypeScript for type safety
- Keep components small and focused
- Extract reusable logic
- Comment complex code
- Test before deploying

---

## 9. Useful Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)

### Tools
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Google Fonts](https://fonts.google.com)
- [Tailwind CSS Color Generator](https://tailwindcss.com/docs/customizing-colors)
- [WebP Converter](https://cloudconvert.com/jpg-to-webp)

### Learning
- [Web.dev](https://web.dev) - Web fundamentals
- [MDN Web Docs](https://developer.mozilla.org) - Reference
- [CSS-Tricks](https://css-tricks.com) - CSS tips
- [Dev.to](https://dev.to) - Dev community

---

## 10. File Checklist

### Must Have Files
- [x] `app/layout.tsx` - Root layout
- [x] `app/page.tsx` - Home page
- [x] `app/globals.css` - Global styles
- [x] `package.json` - Dependencies
- [x] `tsconfig.json` - TypeScript config
- [x] `tailwind.config.ts` - Tailwind config
- [x] `next.config.mjs` - Next.js config

### Important Files
- [x] `components/navigation.tsx` - Main nav
- [x] `components/footer.tsx` - Footer
- [x] `components/hero-section.tsx` - Homepage hero
- [x] `lib/utils.ts` - Utility functions
- [x] `.gitignore` - Git ignore rules

### Optional But Recommended
- [ ] `public/sitemap.xml` - XML sitemap
- [ ] `public/robots.txt` - Robot instructions
- [ ] `README.md` - Project documentation
- [ ] `.env.local` - Local environment variables
- [ ] `analytics.js` - Analytics tracking

---

## Quick Reference

### Common Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Linting (if set up)
npm run lint
```

### File Locations to Remember
```
Text Content:    app/[page]/page.tsx
Styling:         app/globals.css & tailwind.config.ts
Components:      components/
Images:          public/
Navigation:      components/navigation.tsx
Colors:          app/globals.css (:root variables)
Fonts:           app/layout.tsx (imports)
```

### Quick Edit Checklist
To update your site:
1. Change colors → `app/globals.css`
2. Change navigation → `components/navigation.tsx`
3. Change content → `app/[page]/page.tsx`
4. Add images → `public/` folder
5. Deploy → Push to GitHub

---

## Support & Help

If you get stuck:
1. Check the relevant guide from your documentation folder
2. Search error message on Google
3. Check Next.js/React/Tailwind docs
4. Review similar working examples in your code
5. Check browser console for errors (F12)

**You've got this!** 🚀
