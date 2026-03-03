# VIVEKSINGH.TECH - Site Structure & Navigation Map

## Visual Site Map

```
                            🏠 VIVEKSINGH.TECH
                                    |
                    __________________+__________________
                   |                  |                  |
              📍 Home         📍 Main Pages        📍 Meta Pages
                   |                  |                  |
         ┌─────────┼─────────┐   ┌────┼────┐      ┌──────┐
         |         |         |   |    |    |      |      |
        Hero    Skills   Featured  About Projects Resume Contact
        
                            ┌──────────┬──────────┐
                            |          |          |
                        Project1  Project2  Project3
                        
                        (+ Expandable to more)
```

## Full Site Navigation Structure

### 1. PRIMARY PAGES (In Main Navigation)

#### 🏠 Home (/)
- **Path**: `app/page.tsx`
- **Navigation Label**: Home
- **Content**:
  - Hero section (name, title, intro)
  - Quick stats
  - Featured projects (3-4)
  - Call-to-action

#### ℹ️ About (/about)
- **Path**: `app/about/page.tsx`
- **Navigation Label**: About
- **Content**:
  - Full biography
  - Background/experience
  - Philosophy & approach
  - Tech stack

#### 💼 Projects (/projects)
- **Path**: `app/projects/page.tsx`
- **Navigation Label**: Projects
- **Content**:
  - Project grid/list
  - Filters & search
  - Links to individual projects

#### 🔗 Project Details (/projects/[slug])
- **Path**: `app/projects/[slug]/page.tsx`
- **Navigation Label**: (Dynamic - from project list)
- **Content**:
  - Full project details
  - Problem & solution
  - Technical implementation
  - Results & metrics
  - Code snippets
  - Links (GitHub, demo, etc.)

#### 📅 Experience (/experience)
- **Path**: `app/experience/page.tsx`
- **Navigation Label**: Experience
- **Content**:
  - Work experience timeline
  - Education history
  - Achievements
  - Skills summary

#### 📄 Resume (/resume)
- **Path**: `app/resume/page.tsx`
- **Navigation Label**: Resume
- **Content**:
  - Work history
  - Education
  - Skills (organized)
  - Certifications
  - Download PDF button

#### 📞 Contact (/contact)
- **Path**: `app/contact/page.tsx`
- **Navigation Label**: Contact
- **Content**:
  - Contact form
  - Email address
  - Social media links
  - Response message

### 2. SECONDARY PAGES (Not in Navigation)

#### 🏗️ Architecture (/architecture)
- **Path**: `app/architecture/page.tsx`
- **Access**: Footer link or project details
- **Content**: System design documentation

#### 🎨 Demos (/demos)
- **Path**: `app/demos/page.tsx`
- **Access**: Featured section or projects
- **Content**: Interactive project demos

### 3. FOOTER LINKS

**Left Section**:
- Home
- About
- Projects
- Resume

**Right Section**:
- Privacy
- Terms
- Sitemap

**Social**:
- GitHub
- LinkedIn
- Twitter/X
- Email

## Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    STICKY HEADER/NAV                         │
│  Logo (Home) | Home | About | Projects | Experience | Resume │
│                    | Contact | GitHub | LinkedIn             │
└─────────────────────────────────────────────────────────────┘
                              |
                              v
                    ┌─────────────────┐
                    |   HOME PAGE     |
                    ├─────────────────┤
                    | • Hero Section  |
                    | • Quick Stats   |
                    | • Featured Work |
                    | • CTA           |
                    | • Footer Links  |
                    └─────────────────┘
                  ┌─────────┬─────────┬──────────┐
                  |         |         |          |
                  v         v         v          v
              ABOUT      PROJECTS   RESUME    CONTACT
              Page       Page       Page       Page
              
              From Projects → Click Project → PROJECT DETAIL PAGE
```

## URL Structure

```
Root Domain: viveksingh.tech/

Home
└─ /

Main Pages
├─ /about
├─ /projects
├─ /experience
├─ /resume
└─ /contact

Dynamic Pages
├─ /projects/multi-agent-research
├─ /projects/animation-pipeline
└─ /projects/[slug]  ← Any project

Secondary Pages
├─ /architecture
└─ /demos

Special Pages
├─ /sitemap.xml
└─ /robots.txt
```

## Mobile Navigation

```
┌─────────────────────────────────┐
│ Logo     ☰                      │  ← Hamburger menu
├─────────────────────────────────┤
│ Page content                    │
│                                 │
└─────────────────────────────────┘

Click ☰ →

┌─────────────────────────────────┐
│ MENU                        ✕   │
├─────────────────────────────────┤
│                                 │
│ 🏠 Home                        │
│ ℹ️  About                       │
│ 💼 Projects                     │
│ 📅 Experience                   │
│ 📄 Resume                       │
│ 📞 Contact                      │
│                                 │
│ ─────────────────────────────  │
│                                 │
│ 🔗 GitHub                       │
│ 🔗 LinkedIn                     │
│                                 │
└─────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
│
├─ PortfolioShell
│  ├─ Navigation (Header)
│  │  ├─ Logo (Home link)
│  │  ├─ Nav Links
│  │  └─ Mobile Menu
│  │
│  ├─ Page Content
│  │  ├─ Hero Section
│  │  ├─ Main Content
│  │  └─ CTA Section
│  │
│  └─ Footer
│     ├─ Quick Links
│     ├─ Social Links
│     └─ Copyright
│
└─ Theme Provider (Dark mode)
```

## Content Hierarchy

```
HOME PAGE
├─ H1: "Welcome to Vivek Singh"
├─ H2: "Featured Projects"
│  ├─ Project Card 1
│  ├─ Project Card 2
│  └─ Project Card 3
└─ H2: "Let's Work Together"

ABOUT PAGE
├─ H1: "About Vivek Singh"
├─ H2: "Background"
├─ H2: "Expertise"
└─ H2: "Philosophy"

PROJECTS PAGE
├─ H1: "Projects"
├─ Filter/Search (Optional)
├─ H2: "Featured"
│  ├─ Project Card 1
│  ├─ Project Card 2
│  └─ Project Card 3
└─ H2: "All Projects"
   ├─ Project Card 4
   ├─ Project Card 5
   └─ ...

PROJECT DETAIL PAGE
├─ H1: "Project Title"
├─ H2: "Overview"
├─ H2: "Problem"
├─ H2: "Solution"
├─ H2: "Results"
├─ H2: "Tech Stack"
└─ H2: "Resources"
```

## Breadcrumb Navigation

```
Home > Projects > Multi-Agent Research System
                   ↑
                 (current page)

Home > About
        ↑
    (current page)
```

## Navigation Accessibility

### Keyboard Navigation
- `Tab` - Move between links
- `Enter` - Activate link
- `Esc` - Close mobile menu

### Screen Reader
- `<nav>` tags identify navigation
- `aria-current="page"` marks active page
- `role="main"` marks main content
- `<h1>` appears only once per page

## Mobile Responsive Breakpoints

```
Mobile (< 640px)
├─ Hamburger menu icon
├─ Stacked navigation
├─ Full-width content
└─ Single column layout

Tablet (640px - 1024px)
├─ Tab navigation (or hamburger)
├─ 2-column projects grid
├─ Wider content area
└─ Optimized spacing

Desktop (> 1024px)
├─ Full horizontal navigation
├─ 3-4 column projects grid
├─ Max-width container
└─ Plenty of whitespace
```

## Example: Project Navigation

```
User Flow:
┌──────────────────────────┐
│ 1. Visit viveksingh.tech │
└────────────┬─────────────┘
             │
             v
    ┌────────────────────┐
    │ 2. Click "Projects"│
    └────────┬───────────┘
             │
             v
   ┌─────────────────────────┐
   │ 3. See Projects Grid    │
   │    ├─ Project 1 Card   │
   │    ├─ Project 2 Card   │
   │    └─ Project 3 Card   │
   └────────┬────────────────┘
            │ (Click card)
            v
 ┌────────────────────────┐
 │ 4. View Project Detail │
 │    - Description       │
 │    - Problem/Solution  │
 │    - Screenshots       │
 │    - GitHub Link       │
 │    - Demo Link         │
 └────────────────────────┘
```

## Search Engine View

```
Google Search Result:

VIVEKSINGH.TECH
viveksingh.tech/ > about > projects > ...

AI Engineer | FX Artist | Python | Generative AI
Vivek Singh - Portfolio showcasing AI engineering projects,
experience in generative AI, machine learning, and visual effects.
Build intelligent systems and stunning visual effects.
```

## Information Architecture Summary

| Level | Content | Purpose |
|-------|---------|---------|
| 1 | Home | First impression, overview |
| 2 | About, Projects, Resume, Contact | Main destinations |
| 3 | Project Details, Experience | In-depth information |
| Footer | Links, social, legal | Secondary navigation |
| Header | Logo, menu, search | Quick navigation |

## User Journey Examples

### Journey 1: Recruiter
```
Home (5 sec) → Quick scan → Resume (2 min read) → 
Contact (submit inquiry) ✓
```

### Journey 2: Collaborator
```
Home (3 sec) → Projects (1 min browse) → 
Project Details (3 min read) → 
GitHub link → Contact ✓
```

### Journey 3: Investor/Client
```
Home (10 sec) → About (2 min read) → 
Projects (3 min browse) → 
Contact → Schedule call ✓
```

## Customization Points in Navigation

| Element | Location | How to Change |
|---------|----------|---------------|
| Links | `components/navigation.tsx` | Update `links` array |
| Labels | `components/navigation.tsx` | Change `label` text |
| Order | `components/navigation.tsx` | Rearrange lines |
| Social | `components/footer.tsx` | Update social links |
| Routes | `app/[folder]/page.tsx` | Create new pages |
| Header Logo | `components/logo.tsx` | Update text/styling |

## Summary

Your portfolio has:
- **7 main pages** (Home, About, Projects, Project Details, Experience, Resume, Contact)
- **2 secondary pages** (Architecture, Demos)
- **Responsive navigation** (Desktop menu + Mobile hamburger)
- **Clear hierarchy** (Home → Categories → Details)
- **Multiple entry points** (Navigation, footer, project cards)
- **Mobile optimized** (Touch-friendly, readable)

This structure is:
✅ Easy to navigate
✅ Intuitive for visitors
✅ SEO friendly
✅ Scalable (add more projects)
✅ Accessible
✅ Professional
