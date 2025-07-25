# Shriram Architecture Website

A modern, responsive architecture portfolio website featuring advanced animations, smooth theme transitions, and professional interactive design.

## Project Files

- **`index.html`** - Main website structure with navbar, portfolio, services, and contact sections
- **`style.css`** - Complete styling with advanced animation system and smooth theme transitions
- **`script.js`** - Interactive features including theme toggle, scroll animations, and magnetic effects
- **`favicon.svg`** - Custom SVG favicon with "SA" branding

## Features

### 🎨 **Advanced Design System**

- **Professional Fixed Navbar** - Always accessible navigation with blur backdrop
- **Smooth Theme Transitions** - Ultra-smooth light/dark mode switching with 0.6s transitions
- **Advanced Animation System** - Scroll-triggered reveals, magnetic effects, and parallax scrolling
- **Responsive Design** - Mobile-first approach with professional breakpoints

### 🚀 **Interactive Elements**

- **Scroll-Triggered Animations** - Elements animate into view with intersection observer
- **Magnetic Button Effects** - Buttons with hover magnetic attraction effects
- **Enhanced Project Cards** - Cards with advanced hover animations and smooth scaling
- **Counter Animations** - Animated statistics that count up when scrolled into view
- **Parallax Scrolling** - Smooth parallax effects for enhanced visual depth

### 🎯 **Portfolio & Content**

- **Project Gallery** - Dynamic filtering by category (Villa, Apartment, Retreat)
- **Enhanced Project Cards** - Professional hover effects with smooth transitions
- **Service Cards** - Interactive service presentation with animations
- **Contact Form** - Advanced form validation and smooth submission handling

### 🔧 **Technical Excellence**

- **Performance Optimized** - Hardware acceleration and smooth 60fps animations
- **Accessibility Focused** - Respects user motion preferences and ARIA standards
- **Theme Persistence** - localStorage integration for theme preference saving
- **Smooth Navigation** - Enhanced scrolling with proper navbar offset calculations

## Quick Start

Simply open `index.html` in your web browser to view the website locally.

For development with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx live-server
```

## File Structure

```text
index.html     # Main HTML file with all content sections
style.css      # Complete CSS with advanced animations and theme system
script.js      # JavaScript for advanced interactivity and scroll effects
favicon.svg    # Custom brand favicon
README.md      # This documentation file
```

## Customization

### Theme Colors

Update CSS variables in `style.css`:

```css
:root {
    --accent-color: #B8860B;        /* Primary brand color (golden) */
    --accent-light: #D4AF37;        /* Secondary brand color */
    --primary-font: 'Montserrat';   /* Body font */
    --heading-font: 'Playfair Display'; /* Heading font */
}
```

### Content Updates

- **Projects**: Edit project cards in the `#projects` section of `index.html`
- **Contact Info**: Update phone, email, and address throughout the files
- **Company Info**: Modify company name and details in relevant sections

### Images

Replace Unsplash URLs in `index.html` with your own project images.

## Technical Details

### Advanced CSS Features

- CSS custom properties for comprehensive theme system
- Advanced scroll-triggered animations with Intersection Observer
- Hardware-accelerated transforms and transitions
- Professional cubic-bezier easing curves for natural motion
- Responsive design with mobile-first breakpoints
- Fixed navbar with backdrop-filter blur effects

### Enhanced JavaScript Features

- **Theme System**: Advanced theme toggle with smooth transitions and localStorage persistence
- **Scroll Animations**: Intersection Observer API for performance-optimized scroll effects
- **Magnetic Effects**: Advanced cursor-following button interactions
- **Counter Animations**: Smooth number animations triggered by scroll
- **Parallax Scrolling**: Performance-optimized parallax effects
- **Mobile Navigation**: Enhanced hamburger menu with smooth animations

### Animation System

- **Scroll Reveals**: Elements fade and slide into view as user scrolls
- **Staggered Animations**: Multiple elements animate in sequence
- **Magnetic Buttons**: Buttons respond to cursor movement with attraction effects
- **Project Card Hover**: Advanced 3D-style hover effects with shadows
- **Theme Transitions**: Smooth color and background transitions during theme switching

## Performance Features

- **Hardware Acceleration**: All animations use GPU acceleration
- **Optimized Transitions**: Cubic-bezier timing functions for natural motion
- **Reduced Motion Support**: Respects user accessibility preferences
- **60fps Animations**: Smooth animations that don't affect scrolling performance

## Browser Support

Compatible with all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Shriram Architecture Portfolio Website**  
*Professional architecture showcase with modern web technologies*
