# Next.js Navigation Guide

A complete guide to understanding and modifying navigation in your project.

## Table of Contents
1. [Project Structure](#project-structure)
2. [How Navigation Works](#how-navigation-works)
3. [Modifying Navigation Text](#modifying-navigation-text)
4. [Adding New Pages](#adding-new-pages)
5. [Changing URLs/Routes](#changing-urlsroutes)
6. [Active Link Styling](#active-link-styling)
7. [Mobile Navigation](#mobile-navigation)

---

## Project Structure

```
v0-project/
├── app/                              # All pages live here
│   ├── layout.tsx                   # Root layout (applies to all pages)
│   ├── page.tsx                     # Home page (/)
│   ├── demos/
│   │   └── page.tsx                 # /demos route
│   ├── projects/
│   │   └── page.tsx                 # /projects route
│   ├── architecture/
│   │   └── page.tsx                 # /architecture route
│   ├── resume/
│   │   └── page.tsx                 # /resume route
│   └── globals.css                  # Global styles
│
├── components/
│   ├── navigation.tsx               # Navigation component (this file)
│   ├── logo.tsx                     # Logo component
│   └── [other components]/
│
└── public/                          # Static assets
```

## How Navigation Works

### 1. **Navigation Component** (`components/navigation.tsx`)

This is where all navigation logic lives. It has two key parts:

**Links Array** (Lines 10-15):
```typescript
const links = [
  { href: "/", label: "Home" },
  { href: "/demos", label: "AI Demos" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/resume", label: "Resume" },
]
```

- `href`: The URL path (must match a folder in `/app`)
- `label`: The text displayed in navigation

**How It Works:**
1. Next.js automatically creates routes based on folder structure in `/app`
2. The navigation component maps through the `links` array
3. Uses `usePathname()` to detect current page
4. Highlights active link with styling

---

## Modifying Navigation Text

### Step 1: Edit the Links Array
Open `components/navigation.tsx` and find the `links` array at the top:

```typescript
const links = [
  { href: "/", label: "Home" },           // Change "Home" to something else
  { href: "/demos", label: "AI Demos" },  // Change "AI Demos" to something else
  // ... etc
]
```

### Example: Change "AI Demos" to "Live Demos"
```typescript
// Before
{ href: "/demos", label: "AI Demos" },

// After
{ href: "/demos", label: "Live Demos" },
```

### Step 2: Save File
The changes will automatically appear in your browser (Hot Reload).

---

## Adding New Pages

### Step 1: Create a New Folder in `/app`
```
app/
├── blog/              ← Create this folder
│   └── page.tsx       ← Create this file
```

### Step 2: Create `page.tsx` File
In `app/blog/page.tsx`, add:

```typescript
import { PortfolioShell } from "@/components/portfolio-shell"

export default function BlogPage() {
  return (
    <PortfolioShell>
      <section className="py-12">
        <h1>Blog</h1>
        <p>Your blog content here</p>
      </section>
    </PortfolioShell>
  )
}
```

### Step 3: Add to Navigation
Edit `components/navigation.tsx` and add to the links array:

```typescript
const links = [
  { href: "/", label: "Home" },
  { href: "/demos", label: "AI Demos" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },        // ← Add this line
]
```

**Now the "Blog" link will appear in navigation!**

---

## Changing URLs/Routes

### Example: Change `/resume` to `/cv`

**Step 1:** Rename the folder
```
Rename: app/resume/ → app/cv/
```

**Step 2:** Update navigation links
```typescript
// Before
{ href: "/resume", label: "Resume" },

// After
{ href: "/cv", label: "Resume" },
```

**That's it!** The page is now at `/cv` instead of `/resume`.

### ⚠️ Important: Update Internal Links
If you have links pointing to `/resume` elsewhere in your code, update them to `/cv`:

```typescript
// In any component
<Link href="/resume">View Resume</Link>  // Change to /cv
<Link href="/cv">View Resume</Link>      // ✓ Correct
```

---

## Active Link Styling

Your navigation has **automatic active link detection** using `usePathname()`:

```typescript
// In components/navigation.tsx (Line 75-90)
const pathname = usePathname()  // Gets current page path

{links.map((link) => {
  const isActive = pathname === link.href  // Check if this link is active
  
  return (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "text-foreground"              // Active: bright text
          : "text-muted-foreground hover:text-foreground"  // Inactive: dimmer
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-lg bg-white/[0.08]"  // Highlight background
        />
      )}
      <span className="relative">{link.label}</span>
    </Link>
  )
})}
```

**How It Works:**
- When you visit `/projects`, the "Projects" link becomes active
- Active link gets bright text + background highlight
- Inactive links are dimmer until you hover

---

## Mobile Navigation

Your navigation has a **mobile menu** that appears on small screens:

```typescript
// Line 132: Mobile menu button
<button
  className="md:hidden"  // Only shows on mobile
  onClick={() => setMobileOpen(!mobileOpen)}
>
  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</button>
```

**How to Customize:**

1. **Change mobile menu appearance:** Edit the `motion.div` at line 147
2. **Change breakpoint:** Replace `md:hidden` with `lg:hidden` (shows on larger screens)

---

## Common Tasks

### Task 1: Rename "AI Demos" to "Demo"
```typescript
// Line 12 in components/navigation.tsx
{ href: "/demos", label: "Demo" },  // Changed from "AI Demos"
```

### Task 2: Remove "Architecture" from Navigation
```typescript
// Delete this line
{ href: "/architecture", label: "Architecture" },

// Note: The /architecture page still exists, just not in nav
// Users can still visit /architecture directly
```

### Task 3: Add GitHub Link to Navigation Menu
Already done! Look at line 113 in `components/navigation.tsx`:
```typescript
<a
  href="https://github.com/viveksinghfx/Project"
  target="_blank"
  className="group/gh flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-1.5 text-sm font-medium text-foreground"
>
  <Github className="h-4 w-4" />
  GitHub
</a>
```

### Task 4: Change Primary Color Theme
Edit your `globals.css` or `tailwind.config.ts` to change the primary color used in active link styling.

---

## File Reference

| File | Purpose | Edit For |
|------|---------|----------|
| `components/navigation.tsx` | Main navigation logic | Adding/removing nav items, styling |
| `app/[folder]/page.tsx` | Individual pages | Page content |
| `app/layout.tsx` | Root layout | Global styling, fonts, meta tags |
| `globals.css` | Global styles | Colors, fonts, overall theme |

---

## Quick Cheat Sheet

```typescript
// Add a new navigation link
const links = [
  // ...existing links...
  { href: "/newpage", label: "New Page" },
]

// Create the page file
app/newpage/page.tsx

// Update if you change URL
// Old: app/demos/page.tsx → New: app/demos2/page.tsx
// Update link: { href: "/demos2", label: "AI Demos" },
```

---

## Next.js Routing Rules

**Important to Remember:**

1. **Folder = Route**: Folder `/app/projects/` = Route `/projects`
2. **page.tsx Required**: Each folder must have `page.tsx` to be a page
3. **Nested Routes**: `/app/projects/[id]/page.tsx` = `/projects/123`
4. **No Extra Slashes**: `href="/projects"` not `href="/projects/"`
5. **Case Sensitive**: `/Resume` ≠ `/resume` (use lowercase)

---

## Troubleshooting

### Navigation Link Not Showing
- ✓ Added to `links` array in `navigation.tsx`?
- ✓ Page file exists at `app/[pagename]/page.tsx`?
- ✓ Saved the file and browser refreshed?

### Active Link Not Highlighting
- Check `usePathname()` is imported
- Verify `href` in links array matches actual URL
- Check if styles are being applied (check browser DevTools)

### Route Not Found (404)
- Make sure folder structure matches the URL
- `/projects` needs `app/projects/page.tsx`
- Check spelling and capitalization

---

## Best Practices

✅ **Do:**
- Keep navigation links concise (1-2 words)
- Use lowercase URLs
- Keep links in order of importance
- Test mobile navigation on small screens

❌ **Don't:**
- Create links to routes that don't exist
- Use special characters in URLs
- Make navigation too cluttered (keep it simple)
- Forget to update links when you rename folders

---

## Need More Help?

Refer to official Next.js docs: https://nextjs.org/docs/app/getting-started/routing
