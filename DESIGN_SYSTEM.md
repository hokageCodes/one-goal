# One Goal - Complete Design System Reference

## Color Palette

### Light Mode Colors
- **Background**: `#ffffff` (Pure White)
- **Foreground (Text)**: `#0f172a` (Dark Slate)
- **Primary**: `#3b82f6` (Vibrant Blue) - Used for buttons, links, CTAs
- **Secondary**: `#f1f5f9` (Light Gray) - Used for secondary backgrounds
- **Muted**: `#64748b` (Medium Gray) - Used for subtle text
- **Destructive**: `#ef4444` (Red) - Used for errors and destructive actions
- **Border**: `#e2e8f0` (Light Gray) - Used for borders and dividers

### Dark Mode Colors
- **Background**: `#0f172a` (Dark Slate)
- **Foreground (Text)**: `#f8fafc` (Light Gray)
- **Primary**: `#60a5fa` (Lighter Blue) - Adjusted for dark mode visibility
- **Secondary**: `#1e293b` (Medium Slate) - Used for secondary backgrounds
- **Muted**: `#94a3b8` (Light Gray) - Used for subtle text
- **Destructive**: `#dc2626` (Darker Red) - Used for errors
- **Border**: `#1e293b` (Medium Slate) - Used for borders and dividers

## Typography Scale

### Display Sizes (Hero Sections, Landing Pages)
- **display-2xl**: 72px / 4.5rem - Line height: 1.1, Weight: 700
- **display-xl**: 60px / 3.75rem - Line height: 1.1, Weight: 700
- **display-lg**: 48px / 3rem - Line height: 1.2, Weight: 700
- **display-md**: 36px / 2.25rem - Line height: 1.3, Weight: 600
- **display-sm**: 30px / 1.875rem - Line height: 1.3, Weight: 600

### Heading Sizes
- **heading-xl**: 24px / 1.5rem - Line height: 1.4, Weight: 600
- **heading-lg**: 20px / 1.25rem - Line height: 1.5, Weight: 600
- **heading-md**: 18px / 1.125rem - Line height: 1.5, Weight: 600
- **heading-sm**: 16px / 1rem - Line height: 1.5, Weight: 600

### Body Text Sizes
- **body-lg**: 18px / 1.125rem - Line height: 1.75, Weight: 400
- **body-md**: 16px / 1rem - Line height: 1.5, Weight: 400 (default)
- **body-sm**: 14px / 0.875rem - Line height: 1.5, Weight: 400
- **body-xs**: 12px / 0.75rem - Line height: 1.5, Weight: 400

### Usage Examples
```jsx
// Display text
<h1 className="text-display-lg">Hero Title</h1>

// Headings
<h2 className="text-heading-xl">Section Title</h2>

// Body text
<p className="text-body-md">Regular paragraph text</p>
```

## Spacing Scale

Based on 4px base unit for consistency:

- **0.5**: 2px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **10**: 40px
- **12**: 48px
- **16**: 64px
- **20**: 80px
- **24**: 96px

Extended spacing:
- **4.5**: 18px
- **5.5**: 22px
- **6.5**: 26px
- **15**: 60px
- **18**: 72px
- **22**: 88px
- **30**: 120px

### Spacing Guidelines
- **Component padding**: Use 4, 6, 8, 12, 16
- **Section spacing**: Use 16, 20, 24, 30
- **Card padding**: Use 6 (24px) for standard cards
- **Button padding**: Use 4 (16px) horizontal, 2 (8px) vertical

## Border Radius

- **sm**: 4px (calc(var(--radius) - 4px))
- **md**: 6px (calc(var(--radius) - 2px))
- **lg**: 8px (var(--radius) - default)
- **DEFAULT**: 8px

## Shadow System

Elevation levels for consistent depth:

- **xs**: Subtle shadow for inputs
- **sm**: Light shadow for cards at rest
- **DEFAULT**: Standard card shadow
- **md**: Elevated cards
- **lg**: Modals, dropdowns
- **xl**: High elevation elements
- **2xl**: Maximum elevation
- **card**: Standard card shadow
- **card-hover**: Card shadow on hover

### Usage
```jsx
<div className="shadow-card">Standard card</div>
<div className="shadow-card-hover hover:shadow-card-hover">Hoverable card</div>
```

## Z-Index Scale

Consistent layering system:

- **dropdown**: 1000
- **sticky**: 1020 (sticky headers)
- **fixed**: 1030
- **modal-backdrop**: 1040
- **modal**: 1050
- **popover**: 1060
- **tooltip**: 1070

## Breakpoints

- **xs**: 475px (extra small)
- **sm**: 640px (small)
- **md**: 768px (medium)
- **lg**: 1024px (large)
- **xl**: 1280px (extra large)
- **2xl**: 1400px (container max-width)

## Transitions & Animations

### Timing Functions
- **smooth**: cubic-bezier(0.4, 0, 0.2, 1) - Standard smooth transition
- **bounce-in**: cubic-bezier(0.68, -0.55, 0.265, 1.55) - Playful bounce

### Durations
- **400**: 400ms - Quick interactions
- **600**: 600ms - Standard transitions
- **800**: 800ms - Slow, deliberate animations

### Available Animations
- **fade-in**: Fade in with slight upward movement
- **slide-in**: Slide in from left
- **scale-in**: Scale in with fade

## Components

All UI components are located in `/components/ui/` and follow shadcn/ui patterns.

### Button Component
Fully reusable shadcn/ui Button with variants:
- `default` - Primary action
- `secondary` - Secondary action
- `outline` - Outlined button
- `ghost` - Minimal button
- `destructive` - Destructive action
- `link` - Link-style button

Sizes: `sm`, `default`, `lg`, `icon`

### Usage Example
```jsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Primary button
<Button>Get Started</Button>

// Secondary button
<Button variant="secondary">Learn More</Button>

// Button as Link
<Button asChild>
  <Link href="/signup">Sign Up</Link>
</Button>

// Card component
<Card>
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
    <CardDescription>Feature description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Design Principles

1. **Consistency**: All spacing, typography, and colors follow the defined scale
2. **Accessibility**: Proper contrast ratios, focus states, semantic HTML
3. **Responsiveness**: Mobile-first approach, breakpoints for all screen sizes
4. **Reusability**: Components are composable and reusable across the app
5. **Performance**: Minimal CSS, optimized animations, efficient rendering

## Best Practices

1. **Always use design system tokens** - Don't use arbitrary values
2. **Follow spacing scale** - Use predefined spacing values
3. **Use semantic HTML** - Proper heading hierarchy (h1-h6)
4. **Consistent component usage** - Use shadcn/ui components for uniformity
5. **Responsive design** - Test on all breakpoints
6. **Accessibility first** - Proper ARIA labels, keyboard navigation
