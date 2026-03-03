# React Component Structure Guide

Best practices for organizing and writing components in your Next.js portfolio.

## Table of Contents
1. [Directory Structure](#directory-structure)
2. [Component Types](#component-types)
3. [Component Patterns](#component-patterns)
4. [State Management](#state-management)
5. [Props & TypeScript](#props--typescript)
6. [Examples](#examples)

---

## Directory Structure

```
src/
├── app/                          # Pages & layouts
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── projects/
│   │   └── page.tsx
│   └── resume/
│       └── page.tsx
│
├── components/                   # Reusable components
│   ├── ui/                       # UI primitives (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── sections/                 # Page sections
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   └── ...
│   ├── features/                 # Feature components
│   │   ├── login-form.tsx
│   │   ├── project-card.tsx
│   │   └── ...
│   └── layout/                   # Layout components
│       ├── navigation.tsx
│       ├── footer.tsx
│       └── ...
│
├── hooks/                        # Custom hooks
│   ├── use-auth.ts
│   ├── use-projects.ts
│   └── ...
│
├── context/                      # Context providers
│   ├── auth-context.tsx
│   └── theme-context.tsx
│
├── lib/                          # Utilities
│   ├── api-client.ts
│   ├── utils.ts
│   └── ...
│
└── types/                        # TypeScript types
    ├── user.ts
    ├── project.ts
    └── ...
```

---

## Component Types

### 1. Page Components

Located in `app/` directory. These are entry points for routes.

```typescript
// app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <main>
      <section>Projects</section>
    </main>
  )
}
```

### 2. Layout Components

Wrap entire pages or sections.

```typescript
// components/layout/main-layout.tsx
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

### 3. Section Components

Reusable sections of a page.

```typescript
// components/sections/hero-section.tsx
interface HeroProps {
  title: string
  subtitle: string
  image?: string
}

export function HeroSection({ title, subtitle, image }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {image && <img src={image} alt={title} />}
    </section>
  )
}
```

### 4. Feature Components

Standalone feature components with specific functionality.

```typescript
// components/features/project-card.tsx
interface ProjectCardProps {
  id: number
  title: string
  description: string
  technologies: string[]
  onView?: (id: number) => void
}

export function ProjectCard({
  id,
  title,
  description,
  technologies,
  onView,
}: ProjectCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        {technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {onView && <button onClick={() => onView(id)}>View</button>}
    </div>
  )
}
```

### 5. Presentational (Dumb) Components

No logic, just display data.

```typescript
// components/ui/badge.tsx
interface BadgeProps {
  text: string
  variant?: 'primary' | 'secondary'
}

export function Badge({ text, variant = 'primary' }: BadgeProps) {
  return (
    <span className={variant === 'primary' ? 'bg-blue' : 'bg-gray'}>
      {text}
    </span>
  )
}
```

### 6. Container (Smart) Components

Handle logic, fetch data, manage state.

```typescript
// components/projects-container.tsx
'use client'

import { useProjects } from '@/hooks/use-projects'
import { ProjectCard } from './project-card'

export function ProjectsContainer() {
  const { projects, isLoading, error } = useProjects()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
```

---

## Component Patterns

### Controlled Component Pattern

```typescript
interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ControlledInput({
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

// Usage
export function LoginForm() {
  const [username, setUsername] = useState('')
  
  return (
    <ControlledInput
      value={username}
      onChange={setUsername}
      placeholder="Username"
    />
  )
}
```

### Compound Component Pattern

```typescript
// Dialog components work together
interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return open && <div onClick={() => onOpenChange(false)}>{children}</div>
}

export function DialogTrigger({ children, onClick }: any) {
  return <button onClick={onClick}>{children}</button>
}

export function DialogContent({ children }: any) {
  return <div>{children}</div>
}

// Usage
export function MyDialog() {
  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        Open Dialog
      </DialogTrigger>
      <DialogContent>
        <p>Dialog content</p>
      </DialogContent>
    </Dialog>
  )
}
```

### Render Props Pattern

```typescript
interface ListProps<T> {
  items: T[]
  render: (item: T) => React.ReactNode
}

export function List<T>({ items, render }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  )
}

// Usage
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <List
      items={projects}
      render={(project) => (
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      )}
    />
  )
}
```

---

## State Management

### useState (Local State)

```typescript
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

### useContext (Global State)

```typescript
// context/theme-context.tsx
import { createContext, useState } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle: () => setIsDark(!isDark),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// Usage in component
export function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  
  return (
    <button onClick={toggle}>
      {isDark ? 'Light' : 'Dark'} mode
    </button>
  )
}
```

### SWR (Server State)

```typescript
import useSWR from 'swr'

export function ProjectsList() {
  const { data, isLoading, error } = useSWR('/api/projects', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.projects.map(project => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  )
}
```

---

## Props & TypeScript

### Define Props Types

```typescript
// types/project.ts
export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_link?: string
  live_link?: string
}

// components/features/project-card.tsx
import { Project } from '@/types/project'

interface ProjectCardProps extends Omit<Project, 'id'> {
  id: number
  onSelect?: (id: number) => void
}

export function ProjectCard({ id, title, onSelect, ...rest }: ProjectCardProps) {
  return (
    <div onClick={() => onSelect?.(id)}>
      <h3>{title}</h3>
      {/* Rest of component */}
    </div>
  )
}
```

### Default Props

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) {
  return (
    <button disabled={disabled} className={`${variant} ${size}`}>
      {children}
    </button>
  )
}
```

---

## Examples

### Example 1: Project Card Component

```typescript
// components/features/project-card.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  onViewDetails?: (id: number) => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-lg border p-6 cursor-pointer"
    >
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
      
      <div className="flex gap-2 mt-4">
        {project.technologies.map(tech => (
          <span key={tech} className="px-2 py-1 bg-blue-100 rounded">
            {tech}
          </span>
        ))}
      </div>

      {isHovered && (
        <div className="flex gap-2 mt-4">
          {project.github_link && (
            <a href={project.github_link} target="_blank">
              Code
            </a>
          )}
          {project.live_link && (
            <a href={project.live_link} target="_blank">
              Live
            </a>
          )}
          {onViewDetails && (
            <button onClick={() => onViewDetails(project.id)}>
              Details
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}
```

### Example 2: Form Component with Validation

```typescript
// components/features/contact-form.tsx
'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const { toast } = useToast()

  function validateForm(): boolean {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to send')

      toast({ title: 'Message sent successfully!' })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast({ title: 'Failed to send message', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <textarea
          placeholder="Your message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-6 py-2 rounded"
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
```

---

## Component Checklist

- [ ] Component has clear, descriptive name
- [ ] Props are typed with TypeScript
- [ ] Component has single responsibility
- [ ] Reusable components extracted
- [ ] Error states handled
- [ ] Loading states handled
- [ ] Accessibility considered (alt text, aria labels)
- [ ] Props validated
- [ ] Edge cases handled
- [ ] Component tested
