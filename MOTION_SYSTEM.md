# Cinematic Motion System Documentation

## Overview
This website features a premium, Apple-level cinematic motion system with ultra-fluid parallax scrolling, GPU-accelerated animations, and sophisticated micro-interactions.

## Tech Stack
- **Lenis** - Smooth scroll engine (60fps)
- **Framer Motion** - Animation library
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Core Components

### 1. SmoothScroll (`src/components/SmoothScroll.tsx`)
Global smooth scrolling wrapper using Lenis.

**Configuration:**
- Duration: 1.2s
- Easing: Custom exponential decay
- Orientation: Vertical
- Smooth wheel: Enabled
- RAF-based (60fps)

**Usage:**
```tsx
<SmoothScroll>
  <App />
</SmoothScroll>
```

### 2. Parallax System (`src/components/Parallax.tsx`)

**Parallax Component:**
Creates depth-based parallax effects with smooth spring animations.

```tsx
<Parallax speed={0.5} className="...">
  <YourContent />
</Parallax>
```

**ParallaxLayer Component:**
Predefined depth layers for consistent parallax hierarchy.

```tsx
<ParallaxLayer depth="background">  {/* 0.5x speed */}
<ParallaxLayer depth="content">     {/* 1x speed */}
<ParallaxLayer depth="foreground">  {/* 1.1x speed */}
```

### 3. RevealOnScroll (`src/components/RevealOnScroll.tsx`)
Intersection Observer-based reveal animations.

**Features:**
- Fade + slide animations
- Configurable direction (up/down/left/right)
- Stagger delays
- Once-only reveals
- GPU-accelerated

**Usage:**
```tsx
<RevealOnScroll delay={0.1} direction="up" distance={20}>
  <Card />
</RevealOnScroll>

<StaggerReveal staggerDelay={0.05}>
  {items.map(item => <Item key={item.id} />)}
</StaggerReveal>
```

### 4. MagneticButton (`src/components/MagneticButton.tsx`)
Premium magnetic hover effect with spring physics.

**Features:**
- Follows mouse movement
- Spring-based animation
- Scale on hover
- Works with links and buttons

**Usage:**
```tsx
<MagneticButton
  href="/contact"
  strength={0.2}
  className="..."
>
  Click Me
</MagneticButton>
```

### 5. FloatingBlob (`src/components/FloatingBlob.tsx`)
Animated gradient blobs for depth and atmosphere.

**Features:**
- Infinite loop animation
- Customizable colors, size, blur
- GPU-accelerated transforms
- Configurable duration

**Usage:**
```tsx
<FloatingBlob
  color="from-blue-500/30 to-sky-400/30"
  size={600}
  top="-10%"
  left="-10%"
  duration={25}
/>
```

## Motion Principles

### Easing
All animations use premium cubic-bezier easing:
```
cubic-bezier(0.22, 1, 0.36, 1)
```

This creates a smooth, natural deceleration curve.

### Duration
- **Micro-interactions:** 0.2-0.4s
- **Page transitions:** 0.6-0.8s
- **Parallax:** Continuous (RAF-based)
- **Ambient animations:** 20-30s

### Performance Rules

1. **GPU Acceleration**
   - Use `transform` instead of `top/left`
   - Use `opacity` instead of `visibility`
   - Add `willChange` only when needed
   - Remove `willChange` after animation

2. **Lazy Loading**
   - Images use `loading="lazy"`
   - Below-fold content deferred
   - Intersection Observer for reveals

3. **RAF-based Scrolling**
   - No heavy scroll event listeners
   - Lenis handles scroll smoothly
   - 60fps target maintained

4. **Reduced Motion**
   - Respects `prefers-reduced-motion`
   - Animations disabled for accessibility
   - Instant transitions fallback

## Page-Specific Features

### HomePage
- **Hero Section:**
  - Layered parallax (image + text)
  - Floating gradient blobs
  - Magnetic CTA buttons
  - Scroll indicator animation
  - Fade on scroll

- **Services Grid:**
  - Stagger reveal animations
  - Hover lift effect
  - Image zoom on hover
  - Gradient overlay transitions

- **Why Us Section:**
  - Icon scale + rotate on hover
  - Card lift animations
  - Shadow transitions

- **CTA Section:**
  - Background parallax
  - Reveal animations
  - Magnetic button

### ServicesPage
- Hero with parallax background
- Service cards with hover effects
- Feature list reveals
- Benefits section animations

### ContactPage
- Hero section parallax
- Contact info card reveals
- Form field focus animations
- Button magnetic effect

### AboutPage
- Team section reveals
- Timeline animations
- Value proposition cards

## Custom CSS (`src/motion.css`)

### Utility Classes
- `.will-change-transform` - GPU hint
- `.will-change-opacity` - GPU hint
- `.transition-smooth` - Premium easing
- `.hover-lift` - Lift on hover
- `.fade-in` - Fade in animation
- `.scale-in` - Scale in animation
- `.float` - Floating animation
- `.pulse-glow` - Pulsing glow effect

### Shadow System
- `.shadow-premium-sm` - Subtle shadow
- `.shadow-premium-md` - Medium shadow
- `.shadow-premium-lg` - Large shadow
- `.shadow-premium-xl` - Extra large shadow

## Performance Metrics

### Target Performance
- **60fps** smooth scrolling
- **<100ms** interaction response
- **<3s** First Contentful Paint
- **<5s** Time to Interactive

### Optimization Techniques
1. Image optimization (WebP format)
2. Code splitting
3. Lazy loading
4. GPU acceleration
5. RAF-based animations
6. Debounced scroll handlers
7. Intersection Observer for reveals

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility
- Respects `prefers-reduced-motion`
- Keyboard navigation supported
- Focus indicators visible
- ARIA labels on interactive elements
- Semantic HTML structure

## Development Tips

### Adding New Animations
1. Use Framer Motion's `motion` components
2. Apply premium easing: `[0.22, 1, 0.36, 1]`
3. Keep durations between 0.4-0.8s
4. Add `willChange` sparingly
5. Test with reduced motion enabled

### Debugging Performance
1. Use Chrome DevTools Performance tab
2. Check for layout thrashing
3. Monitor FPS in rendering
4. Verify GPU acceleration
5. Profile animation costs

### Best Practices
- Avoid animating `width`, `height`, `top`, `left`
- Use `transform` and `opacity` only
- Batch DOM reads/writes
- Use `requestAnimationFrame` for scroll
- Lazy load below-fold content
- Optimize images (WebP, proper sizing)

## Future Enhancements
- [ ] Cursor trail effect
- [ ] Page transition animations
- [ ] 3D tilt effects
- [ ] Scroll-triggered animations
- [ ] Video backgrounds with parallax
- [ ] Advanced particle systems
- [ ] Custom loading animations
- [ ] Gesture-based interactions

## Credits
- **Lenis** by Studio Freight
- **Framer Motion** by Framer
- **Design Inspiration** - Apple, Stripe, Linear

---

**Last Updated:** March 2026
**Version:** 1.0.0
