# Quick Start Guide - Make Changes in 2 Minutes

## Before You Start
Your portfolio has these files - DON'T touch them unless you know what you're doing:
- `package.json` - Package dependencies
- `tsconfig.json` - TypeScript settings
- `next.config.mjs` - Next.js settings
- All files in `/node_modules` - Installed packages

## You CAN safely edit these files:

---

## 1. Change Colors (Most Common)

**File to edit**: `app/globals.css`

Find this section:
```css
:root {
  --primary: 200 95% 50%;        /* Main cyan color */
  --secondary: 222 20% 12%;      /* Dark gray */
  --accent: 200 95% 50%;         /* Accent color */
}
```

**Examples**:
- Red: `0 95% 50%`
- Green: `120 95% 50%`
- Blue: `240 95% 50%`
- Purple: `270 95% 50%`
- Orange: `30 95% 50%`

Change any value, save, and see instant updates!

---

## 2. Change Navigation Menu

**File to edit**: `components/navigation.tsx`

Find this section (around line 30):
```tsx
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]
```

**To add a new link**:
```tsx
{ href: '/blog', label: 'Blog' }
```

**To remove a link**: Delete the entire line

**To rename**: Change the `label`:
```tsx
{ href: '/about', label: 'Biography' }  // Changed from "About"
```

**To reorder**: Move lines around (top = leftmost in menu)

---

## 3. Change Homepage Text

**File to edit**: `components/hero-section.tsx`

Find and change:
```tsx
<h1>Your name</h1>
<p>Your title here</p>
<p>Your description here</p>
```

Example:
```tsx
<h1>Vivek Singh</h1>
<p>AI Engineer & FX Artist</p>
<p>Building intelligent systems and stunning visual effects</p>
```

---

## 4. Change About Page

**File to edit**: `app/about/page.tsx`

Find these sections and update:
```tsx
const aboutText = "Your biography..."
const approach = "Your approach..."
const philosophy = "Your philosophy..."
```

---

## 5. Change Project Information

**File to edit**: `components/featured-projects.tsx`

Find the `projects` array and update each project:
```tsx
{
  id: 'project-1',
  title: 'Your Project Title',
  description: 'What it does',
  image: '/projects/image.jpg',
  tags: ['React', 'TypeScript', 'Python'],
  link: '/projects/project-1'
}
```

---

## 6. Change Resume/Experience

**File to edit**: `app/resume/page.tsx`

Update these arrays:

**Work Experience**:
```tsx
const experience = [
  {
    role: "Your Job Title",
    company: "Company Name",
    period: "Start Date - End Date",
    bullets: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
    ],
  },
]
```

**Education**:
```tsx
const education = [
  {
    degree: "Your Degree",
    school: "University Name",
    period: "Start - End",
  },
]
```

**Skills**:
```tsx
const skillCategories = [
  {
    label: "Category Name",
    skills: ["Skill1", "Skill2", "Skill3"],
  },
]
```

**Certifications**:
```tsx
const certifications = [
  "Certificate Name",
  "Another Certificate",
]
```

---

## 7. Add Images

**Steps**:
1. Add image to `/public/projects/` folder
2. Reference it in code:
   ```tsx
   image: '/projects/my-image.jpg'
   ```
3. That's it!

**Best formats**: JPG, PNG, WebP
**Size**: Keep under 500KB

---

## 8. Change Social Links

**File to edit**: `components/footer.tsx` and `components/contact-cta.tsx`

Find links like:
```tsx
<a href="https://github.com/yourname">GitHub</a>
<a href="https://linkedin.com/in/yourname">LinkedIn</a>
```

Update with your actual URLs.

---

## 9. Add a New Page

**Steps**:
1. Create folder: `app/new-page/`
2. Create file: `app/new-page/page.tsx`
3. Copy template:
   ```tsx
   import { PortfolioShell } from "@/components/portfolio-shell"
   
   export default function NewPage() {
     return (
       <PortfolioShell>
         <section className="py-12">
           <h1>Your Page Title</h1>
           <p>Your content here</p>
         </section>
       </PortfolioShell>
     )
   }
   ```
4. Add to navigation:
   ```tsx
   { href: '/new-page', label: 'New Page' }
   ```

---

## 10. Test Your Changes

1. Save file (Ctrl+S or Cmd+S)
2. Go to browser (should auto-refresh)
3. See your changes instantly
4. Use Ctrl+Shift+R to hard refresh if needed

---

## Common Mistakes to Avoid

❌ Don't edit `package.json`
✅ Do edit page files (`app/*/page.tsx`)

❌ Don't delete files in `/node_modules`
✅ Do add new files in `/app`, `/components`, `/public`

❌ Don't break HTML structure (missing closing tags)
✅ Do keep HTML properly formatted

❌ Don't use unsupported characters in URLs
✅ Do use kebab-case: `/my-page` not `/my page`

❌ Don't have two `<h1>` tags on one page
✅ Do keep proper heading hierarchy

---

## If Something Breaks

1. **Check the error message** in browser console (F12)
2. **Undo your changes** (Ctrl+Z)
3. **Look for typos** (missing quotes, brackets)
4. **Check file path** is correct
5. **Reload page** (Ctrl+Shift+R)

---

## File Quick Reference

```
EDIT THESE ✅              DON'T TOUCH ❌
───────────────────────   ──────────────────
app/page.tsx              package.json
app/*/page.tsx            tsconfig.json
components/*.tsx          next.config.mjs
app/globals.css           /node_modules
public/                   /dist
.env.local                Lock files
```

---

## Before You Deploy

Checklist:
- [ ] All links work
- [ ] No typos
- [ ] Images load
- [ ] Mobile looks good (test on phone)
- [ ] No console errors (F12)
- [ ] Colors look good
- [ ] Navigation makes sense

---

## Deployment (One Command)

When ready to live:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Vercel automatically deploys! ✨

---

## Need More Help?

Check these guides:
- **Detailed Setup**: `COMPLETE_PROJECT_GUIDE.md`
- **UX Tips**: `UX_IMPROVEMENTS_GUIDE.md`
- **Navigation**: `NAVIGATION_GUIDE.md`
- **API Backend**: `API_STRUCTURE_GUIDE.md`

Good luck! 🚀
