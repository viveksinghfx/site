# Visual Guides - Diagrams & Flowcharts

## 1. How Your Portfolio Works

```
┌─────────────────────────────────────────────────────────────┐
│            VISITOR ARRIVES AT viveksingh.tech              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  Home Page Loads     │
          │  (Next.js)           │
          └──────────┬───────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ Header │  │ Content│  │ Footer │
    │  Menu  │  │  (Hero)│  │ Links  │
    └────────┘  └────────┘  └────────┘
         │
    VISITOR CLICKS
         │
    ┌────┴────────────────────┬────────────────────┐
    │                         │                    │
    ▼                         ▼                    ▼
 Projects               Navigation            Social Links
 Details Page          to New Page         (GitHub, LinkedIn)
```

## 2. Development Process

```
YOUR WORKFLOW:
┌──────────────────────────────────────────────────────┐
│ 1. Edit Files                                        │
│    └─ app/page.tsx                                   │
│    └─ app/globals.css                                │
│    └─ components/                                    │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
          ┌──────────────────────┐
          │ 2. Save Changes      │
          │    (Ctrl+S)          │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ 3. Browser Auto      │
          │    Refreshes (HMR)   │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ 4. See Changes       │
          │    Instantly!        │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ 5. Ready to Deploy   │
          │    git push          │
          └──────────────────────┘
```

## 3. Color Customization Flow

```
YOU WANT TO CHANGE COLORS:

Step 1: Open File
  └─ app/globals.css
  
Step 2: Find Colors
  ├─ --primary: 200 95% 50%     (Cyan/Blue)
  ├─ --secondary: 222 20% 12%   (Dark Gray)
  └─ --accent: 200 95% 50%      (Accent)

Step 3: Choose New Color
  Pick a color: Red, Green, Purple, Orange, etc.
  └─ Find HSL value: Google "red color HSL"
  
Step 4: Update Value
  --primary: 0 95% 50%   ← Change from 200 to 0 (red)

Step 5: Save
  Ctrl+S

Step 6: Instant Result
  Browser shows new colors everywhere! ✨
```

## 4. Project Management Structure

```
YOUR PROJECTS:

┌────────────────────────────────────────────┐
│ PROJECTS DATA                              │
│ (components/featured-projects.tsx)         │
└──────────────────┬─────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
    Project1   Project2   Project3
    ├─ title   ├─ title   ├─ title
    ├─ desc    ├─ desc    ├─ desc
    ├─ image   ├─ image   ├─ image
    ├─ tags    ├─ tags    ├─ tags
    └─ link    └─ link    └─ link
        │          │          │
        └──────────┼──────────┘
                   │
                   ▼
    Displays on 3 Pages:
    ├─ Home (Featured Projects)
    ├─ Projects Page (Grid)
    └─ Project Detail Pages
```

## 5. Page Rendering Flow

```
USER VISITS PAGE:

viveksingh.tech/projects
         │
         ▼
    ┌─────────────────────┐
    │ Next.js Router      │
    │ Matches: /projects  │
    └──────────┬──────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Load page.tsx        │
    │ (app/projects/)      │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Execute React Code   │
    └──────────┬───────────┘
               │
        ┌──────┼──────┐
        │      │      │
        ▼      ▼      ▼
    Layout  Props  State
        │      │      │
        └──────┼──────┘
               │
               ▼
    ┌──────────────────────┐
    │ Generate HTML        │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Send to Browser      │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Display Page         │
    │ (with CSS + JS)      │
    └──────────────────────┘
```

## 6. Component Hierarchy Tree

```
RootLayout (app/layout.tsx)
│
├─ PortfolioShell
│  │
│  ├─ Navigation Component
│  │  ├─ Logo (clickable)
│  │  ├─ Nav Links Array
│  │  │  ├─ Home
│  │  │  ├─ About
│  │  │  ├─ Projects
│  │  │  ├─ Experience
│  │  │  ├─ Resume
│  │  │  └─ Contact
│  │  └─ Mobile Menu (hamburger)
│  │
│  ├─ Page Content (varies per page)
│  │  ├─ HeroSection (home only)
│  │  ├─ SkillsSection (home/about)
│  │  ├─ FeaturedProjects (home)
│  │  ├─ ProjectGrid (projects page)
│  │  ├─ ProjectDetail (project page)
│  │  └─ ContactCTA (contact page)
│  │
│  └─ Footer Component
│     ├─ Quick Links
│     ├─ Social Links
│     └─ Copyright Text
│
└─ Providers
   ├─ ThemeProvider (dark mode)
   └─ FramerMotion Provider
```

## 7. Customization Decision Tree

```
WANT TO CHANGE SOMETHING?

                Start Here
                    │
                    ▼
              What do you want?
              ┌─────────────────────┐
        ┌─────┤ Color? Text? Design?│
        │     └─────────────────────┘
        │
    ┌───┴──────────────────────────────┐
    │                                  │
    ▼                                  ▼
STYLING                           CONTENT
(Colors, fonts, spacing)      (Text, projects, pages)
    │                              │
    ▼                              ▼
globals.css                    Page/Component Files
tailwind.config.ts             (app/*/page.tsx)
    │                          components/*.tsx
    │                              │
    ▼                              ▼
1. Update values            1. Find text in JSX
2. Save file                2. Edit the text
3. Browser refreshes        3. Save file
   instantly!               4. Browser refreshes
                               instantly!

Both take < 2 minutes! ⚡
```

## 8. Deployment Flow

```
LOCAL DEVELOPMENT:
┌──────────────────────────┐
│ npm run dev              │
│ (http://localhost:3000)  │
└────────────┬─────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Make changes       │
    │ Hot reload works   │
    │ Test everything    │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Ready to deploy?   │
    └────────┬───────────┘
             │
    ┌────────┴───────────────────────┐
    │                                │
    ▼                                ▼
DEPLOY LOCALLY               DEPLOY TO INTERNET
┌──────────────────┐         ┌──────────────────┐
│ npm run build    │         │ git push origin  │
│ npm start        │         │ main             │
│ Test build       │         │                  │
└──────────────────┘         └────────┬─────────┘
    (Final check)                     │
                                      ▼
                            ┌──────────────────┐
                            │ GitHub Push      │
                            │ ↓               │
                            │ Vercel Detects   │
                            │ ↓               │
                            │ Auto Build       │
                            │ ↓               │
                            │ Auto Deploy      │
                            │ ↓               │
                            │ LIVE! 🎉        │
                            └──────────────────┘
```

## 9. File Editing Workflow

```
COMMON EDITS:

┌──────────────────────────────────────────────────────────┐
│ WHAT TO CHANGE          │  FILE TO EDIT                 │
├──────────────────────────────────────────────────────────┤
│ Main color             │  app/globals.css               │
│ Home page text         │  components/hero-section.tsx   │
│ Navigation menu        │  components/navigation.tsx     │
│ Projects list          │  components/featured-projects  │
│ About page content     │  app/about/page.tsx            │
│ Resume/Experience      │  app/resume/page.tsx           │
│ Footer links           │  components/footer.tsx         │
│ Images                 │  public/projects/              │
│ Global spacing         │  tailwind.config.ts            │
│ Custom CSS             │  app/globals.css               │
└──────────────────────────────────────────────────────────┘
```

## 10. Backend Architecture (Optional)

```
WHEN YOU WANT TO ADD BACKEND:

User Interface (Frontend)
├─ React Components
├─ Form Inputs
└─ API Calls (fetch/SWR)
       │
       ▼
HTTP Request
(POST /api/contact)
       │
       ▼
┌──────────────────────────┐
│ BACKEND (Python)         │
├──────────────────────────┤
│ FastAPI                  │
│  ↓                       │
│ Route Handler            │
│  ↓                       │
│ Validate Data (Pydantic) │
│  ↓                       │
│ Process Request          │
│  ↓                       │
│ Database (SQLAlchemy)    │
│  ↓                       │
│ Return Response (JSON)   │
└──────────┬───────────────┘
           │
           ▼
HTTP Response (JSON)
           │
           ▼
Frontend Updates UI
(Show success/error)
```

## 11. Mobile Responsive Breakpoints

```
SCREEN SIZES:

Mobile              Tablet              Desktop
(< 640px)          (640-1024px)        (> 1024px)

┌─────────────┐  ┌───────────────┐  ┌─────────────────┐
│             │  │               │  │                 │
│ Hamburger   │  │  Tab Menu     │  │ Full Menu       │
│ Menu        │  │  (or still    │  │ (Horizontal)    │
│             │  │   hamburger)  │  │                 │
├─────────────┤  ├───────────────┤  ├─────────────────┤
│             │  │               │  │                 │
│ Single      │  │ 2-Column      │  │ 3-4 Column      │
│ Column      │  │ Projects      │  │ Projects        │
│ Projects    │  │               │  │                 │
│             │  │               │  │                 │
│ Full Width  │  │ Wider Content │  │ Content Max     │
│ Content     │  │               │  │ Width + Padding │
└─────────────┘  └───────────────┘  └─────────────────┘

All content still readable and usable! ✨
```

## 12. Project Addition Flow

```
ADD A NEW PROJECT:

Step 1: Create Image
  └─ Optimized image → public/projects/my-project.jpg

Step 2: Update Data
  └─ components/featured-projects.tsx
     └─ Add to projects array:
        {
          title: "My Project",
          description: "...",
          image: '/projects/my-project.jpg',
          tags: ['React', 'Python'],
          link: '/projects/my-project'
        }

Step 3: Create Detail Page
  └─ app/projects/my-project/page.tsx
     └─ Add full project description

Step 4: Save & Deploy
  └─ git push
  └─ Vercel auto-deploys
  └─ Project appears on site! 🎉

Time: 10 minutes
Difficulty: ⭐ Easy
```

## 13. User Journey Diagram

```
RECRUITER VISITING YOUR PORTFOLIO:

Lands on Homepage
        │
        ├─ Read headline (10 sec)
        │
        ├─ Glance featured projects (20 sec)
        │
        ├─ Click "Resume" (2 min read)
        │
        ├─ Click "Projects" (1 min browse)
        │
        ├─ Click project detail (3 min read)
        │
        ├─ Check GitHub link (2 min)
        │
        └─ Click "Contact" button
           └─ Send message ✓ SUCCESS!
           
Total Time: ~10 minutes
First Impression: STRONG ✨
```

## 14. Learning Resources Map

```
WANT TO LEARN SOMETHING?

Your Portfolio
       │
       ├─ How does Next.js work?
       │  └─ Learn from app/ folder
       │
       ├─ How to write React?
       │  └─ Learn from components/
       │
       ├─ How to style with Tailwind?
       │  └─ Learn from *.tsx files
       │
       ├─ How to deploy?
       │  └─ Read DEPLOYMENT_GUIDE.md
       │
       ├─ How to build backend?
       │  └─ Read API_STRUCTURE_GUIDE.md
       │
       ├─ How to add auth?
       │  └─ Read AUTHENTICATION_GUIDE.md
       │
       └─ How to handle errors?
          └─ Read ERROR_HANDLING_GUIDE.md

Your portfolio IS your learning resource! 📚
```

## 15. Success Checklist

```
BEFORE DEPLOYING:

Design ✓
  ├─ [ ] Colors look good
  ├─ [ ] Typography readable
  ├─ [ ] Spacing consistent
  └─ [ ] Mobile looks great

Content ✓
  ├─ [ ] Name/title updated
  ├─ [ ] Projects added
  ├─ [ ] Resume updated
  ├─ [ ] Social links correct
  └─ [ ] No typos

Functionality ✓
  ├─ [ ] All links work
  ├─ [ ] Mobile menu works
  ├─ [ ] No console errors (F12)
  ├─ [ ] Fast loading (< 3sec)
  └─ [ ] Contact form works

Performance ✓
  ├─ [ ] Images optimized
  ├─ [ ] No broken images
  ├─ [ ] Smooth animations
  └─ [ ] Responsive on all sizes

SEO ✓
  ├─ [ ] Page title updated
  ├─ [ ] Meta description added
  ├─ [ ] Keywords in content
  └─ [ ] Heading hierarchy correct

DEPLOY! 🚀
```

---

## How to Use These Diagrams

1. **Confused about flow?** Check the flow diagrams
2. **Need visual overview?** Check the tree diagrams
3. **Want to understand structure?** Check the hierarchy diagrams
4. **Planning a change?** Check the decision tree

Print these out if it helps! Visual learning is powerful. 📊

All diagrams are ASCII art, so they work everywhere!
